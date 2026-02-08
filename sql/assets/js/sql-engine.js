/**
 * RD-SQL Mock Engine v2.0
 * A regex-based SQL simulator with JOIN, GROUP BY, and extended aggregates.
 */

class MockSQLEngine {
    constructor() {
        this.initialState = {
            users: [
                { id: 1, name: "Alice", role: "Admin", email: "alice@rd-sql.com", department_id: 1 },
                { id: 2, name: "Bob", role: "User", email: "bob@test.com", department_id: 2 },
                { id: 3, name: "Charlie", role: "User", email: "charlie@test.com", department_id: 1 },
                { id: 4, name: "Diana", role: "Manager", email: "diana@rd-sql.com", department_id: 2 },
                { id: 5, name: "Eve", role: "User", email: "eve@test.com", department_id: 3 }
            ],
            products: [
                { id: 101, name: "Laptop", price: 1200, stock: 5, category: "Electronics" },
                { id: 102, name: "Mouse", price: 25, stock: 100, category: "Electronics" },
                { id: 103, name: "Keyboard", price: 45, stock: 50, category: "Electronics" },
                { id: 104, name: "Desk", price: 300, stock: 20, category: "Furniture" },
                { id: 105, name: "Chair", price: 250, stock: 15, category: "Furniture" },
                { id: 106, name: "Monitor", price: 400, stock: 30, category: "Electronics" }
            ],
            departments: [
                { id: 1, name: "IT", budget: 50000 },
                { id: 2, name: "Marketing", budget: 30000 },
                { id: 3, name: "Sales", budget: 40000 }
            ],
            orders: [
                { id: 1, user_id: 1, product_id: 101, quantity: 1, order_date: "2024-01-15" },
                { id: 2, user_id: 2, product_id: 102, quantity: 3, order_date: "2024-02-10" },
                { id: 3, user_id: 1, product_id: 103, quantity: 2, order_date: "2024-02-20" },
                { id: 4, user_id: 3, product_id: 104, quantity: 1, order_date: "2024-03-05" },
                { id: 5, user_id: 4, product_id: 106, quantity: 2, order_date: "2024-03-15" }
            ]
        };
        this.reset();
    }

    reset() {
        this.db = JSON.parse(JSON.stringify(this.initialState));
    }

    execute(query) {
        query = query.trim().replace(/;/g, '');
        const upperQ = query.toUpperCase();

        try {
            if (upperQ.startsWith("SELECT")) return this.handleSelect(query);
            else if (upperQ.startsWith("INSERT")) return this.handleInsert(query);
            else if (upperQ.startsWith("UPDATE")) return this.handleUpdate(query);
            else if (upperQ.startsWith("DELETE")) return this.handleDelete(query);
            else if (upperQ.startsWith("CREATE TABLE")) return this.handleCreateTable(query);
            else if (upperQ.startsWith("CREATE") || upperQ.startsWith("WHILE") || upperQ.startsWith("IF") || upperQ.startsWith("DECLARE"))
                return this.handleMockDML(query);
            else throw new Error("Syntaxe non supportée dans ce simulateur.");
        } catch (e) {
            return { success: false, error: e.message };
        }
    }

    handleCreateTable(query) {
        const match = query.match(/CREATE\s+TABLE\s+(\w+)/i);
        if (!match) throw new Error("Format CREATE TABLE invalide.");
        const tableName = match[1].toLowerCase();
        if (this.db[tableName]) return { success: false, error: "La table existe déjà." };
        this.db[tableName] = [];
        return { success: true, message: `Table '${tableName}' créée avec succès.`, data: [] };
    }

    handleSelect(query) {
        const upperQ = query.toUpperCase();

        // Detect JOIN
        const joinMatch = query.match(/FROM\s+(\w+)\s+(?:(\w+)\s+)?(?:INNER\s+)?JOIN\s+(\w+)\s+(?:(\w+)\s+)?ON\s+(\w+)\.(\w+)\s*=\s*(\w+)\.(\w+)/i);
        if (joinMatch || upperQ.includes(' JOIN ')) {
            return this.handleJoin(query);
        }

        // Detect GROUP BY
        if (upperQ.includes('GROUP BY')) {
            return this.handleGroupBy(query);
        }

        // Standard SELECT
        const regex = /SELECT\s+(.+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+?))?(?:\s+ORDER\s+BY\s+(.+))?$/i;
        const match = query.match(regex);
        if (!match) throw new Error("Format SELECT invalide. Utilisez: SELECT * FROM table [WHERE condition]");

        const columnsRaw = match[1].trim();
        const tableName = match[2].trim().toLowerCase();
        const whereClause = match[3];
        const orderBy = match[4];

        if (!this.db[tableName]) throw new Error(`Table '${tableName}' introuvable. Tables: ${Object.keys(this.db).join(', ')}`);

        let results = JSON.parse(JSON.stringify(this.db[tableName]));

        // FILTER (WHERE)
        if (whereClause) {
            results = this._applyWhere(results, whereClause);
        }

        // AGGREGATES (without GROUP BY)
        const aggResult = this._checkAggregates(columnsRaw, results);
        if (aggResult) return aggResult;

        // ORDER BY
        if (orderBy) {
            results = this._applyOrderBy(results, orderBy);
        }

        // PROJECTION
        if (columnsRaw !== '*') {
            results = this._applyProjection(results, columnsRaw);
        }

        // TOP / LIMIT
        const topMatch = columnsRaw.match(/TOP\s+(\d+)/i);
        if (topMatch) {
            results = results.slice(0, parseInt(topMatch[1]));
        }

        return { success: true, data: results, message: `${results.length} ligne(s) sélectionnée(s).` };
    }

    handleJoin(query) {
        // Parse: SELECT cols FROM t1 [alias] [INNER|LEFT] JOIN t2 [alias] ON a.col = b.col [WHERE ...] [ORDER BY ...]
        const joinRegex = /SELECT\s+(.+?)\s+FROM\s+(\w+)(?:\s+(\w+))?\s+(?:(INNER|LEFT|RIGHT)\s+)?JOIN\s+(\w+)(?:\s+(\w+))?\s+ON\s+(\w+)\.(\w+)\s*=\s*(\w+)\.(\w+)(?:\s+WHERE\s+(.+?))?(?:\s+ORDER\s+BY\s+(.+?))?(?:\s+GROUP\s+BY\s+(.+))?$/i;
        const m = query.match(joinRegex);
        if (!m) throw new Error("Format JOIN invalide. Utilisez: SELECT * FROM t1 JOIN t2 ON t1.col = t2.col");

        const cols = m[1].trim();
        const t1Name = m[2].toLowerCase();
        const t1Alias = (m[3] || t1Name).toLowerCase();
        const joinType = (m[4] || 'INNER').toUpperCase();
        const t2Name = m[5].toLowerCase();
        const t2Alias = (m[6] || t2Name).toLowerCase();
        const onLeft = { alias: m[7].toLowerCase(), col: m[8].toLowerCase() };
        const onRight = { alias: m[9].toLowerCase(), col: m[10].toLowerCase() };
        const whereClause = m[11];
        const orderBy = m[12];
        const groupBy = m[13];

        if (!this.db[t1Name]) throw new Error(`Table '${t1Name}' introuvable.`);
        if (!this.db[t2Name]) throw new Error(`Table '${t2Name}' introuvable.`);

        // Determine which alias maps to which table
        const aliasMap = {};
        aliasMap[t1Alias] = t1Name;
        aliasMap[t2Alias] = t2Name;

        // Determine join columns
        const leftTable = aliasMap[onLeft.alias] || t1Name;
        const rightTable = aliasMap[onRight.alias] || t2Name;
        const leftCol = onLeft.col;
        const rightCol = onRight.col;

        let results = [];
        const leftData = this.db[t1Name];
        const rightData = this.db[t2Name];

        // Perform join
        leftData.forEach(lRow => {
            let matched = false;
            rightData.forEach(rRow => {
                const lVal = lRow[leftTable === t1Name ? leftCol : rightCol];
                const rVal = rRow[rightTable === t2Name ? rightCol : leftCol];
                if (lVal === rVal) {
                    matched = true;
                    // Merge rows with alias prefix
                    const merged = {};
                    Object.keys(lRow).forEach(k => { merged[`${t1Alias}.${k}`] = lRow[k]; merged[k] = lRow[k]; });
                    Object.keys(rRow).forEach(k => { merged[`${t2Alias}.${k}`] = rRow[k]; if (!merged.hasOwnProperty(k)) merged[k] = rRow[k]; });
                    results.push(merged);
                }
            });
            if (!matched && joinType === 'LEFT') {
                const merged = {};
                Object.keys(lRow).forEach(k => { merged[`${t1Alias}.${k}`] = lRow[k]; merged[k] = lRow[k]; });
                Object.keys(rightData[0] || {}).forEach(k => { merged[`${t2Alias}.${k}`] = null; if (!merged.hasOwnProperty(k)) merged[k] = null; });
                results.push(merged);
            }
        });

        // WHERE
        if (whereClause) results = this._applyWhere(results, whereClause);

        // GROUP BY
        if (groupBy) {
            return this._groupByResults(results, cols, groupBy);
        }

        // Aggregates
        const aggResult = this._checkAggregates(cols, results);
        if (aggResult) return aggResult;

        // ORDER BY
        if (orderBy) results = this._applyOrderBy(results, orderBy);

        // Projection
        if (cols !== '*') results = this._applyProjection(results, cols);

        return { success: true, data: results, message: `${results.length} ligne(s) (JOIN).` };
    }

    handleGroupBy(query) {
        const regex = /SELECT\s+(.+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+?))?\s+GROUP\s+BY\s+(.+?)(?:\s+HAVING\s+(.+?))?(?:\s+ORDER\s+BY\s+(.+))?$/i;
        const m = query.match(regex);
        if (!m) throw new Error("Format GROUP BY invalide.");

        const cols = m[1].trim();
        const tableName = m[2].toLowerCase();
        const whereClause = m[3];
        const groupBy = m[4].trim();

        if (!this.db[tableName]) throw new Error(`Table '${tableName}' introuvable.`);

        let data = JSON.parse(JSON.stringify(this.db[tableName]));
        if (whereClause) data = this._applyWhere(data, whereClause);

        return this._groupByResults(data, cols, groupBy);
    }

    _groupByResults(data, selectCols, groupByRaw) {
        const groupCol = groupByRaw.trim().replace(/\w+\./g, '').toLowerCase();
        
        // Group
        const groups = {};
        data.forEach(row => {
            const key = row[groupCol] !== undefined ? row[groupCol] : 'NULL';
            if (!groups[key]) groups[key] = [];
            groups[key].push(row);
        });

        // Parse select columns for aggregates
        const results = [];
        for (const [key, rows] of Object.entries(groups)) {
            const row = {};
            row[groupCol] = key;

            // Parse each select column
            selectCols.split(',').forEach(col => {
                col = col.trim();
                const aggMatch = col.match(/(COUNT|SUM|AVG|MIN|MAX)\s*\(\s*(\*|\w+)\s*\)(?:\s+AS\s+(\w+))?/i);
                if (aggMatch) {
                    const fn = aggMatch[1].toUpperCase();
                    const aggCol = aggMatch[2].toLowerCase();
                    const alias = aggMatch[3] || `${fn}(${aggMatch[2]})`;
                    
                    if (fn === 'COUNT') row[alias] = rows.length;
                    else if (fn === 'SUM') row[alias] = rows.reduce((a, r) => a + (parseFloat(r[aggCol]) || 0), 0);
                    else if (fn === 'AVG') row[alias] = Math.round(rows.reduce((a, r) => a + (parseFloat(r[aggCol]) || 0), 0) / rows.length * 100) / 100;
                    else if (fn === 'MIN') row[alias] = Math.min(...rows.map(r => parseFloat(r[aggCol]) || 0));
                    else if (fn === 'MAX') row[alias] = Math.max(...rows.map(r => parseFloat(r[aggCol]) || 0));
                }
            });

            results.push(row);
        }

        return { success: true, data: results, message: `${results.length} groupe(s).` };
    }

    _applyWhere(data, whereClause) {
        return data.filter(row => {
            let jsCond = whereClause
                .replace(/\bIS\s+NULL\b/gi, '=== null')
                .replace(/\bIS\s+NOT\s+NULL\b/gi, '!== null')
                .replace(/(?<![<>!])=(?!=)/g, '==')
                .replace(/<>/g, '!=')
                .replace(/\bAND\b/gi, '&&')
                .replace(/\bOR\b/gi, '||');

            // Remove table alias prefixes  
            jsCond = jsCond.replace(/\w+\.(\w+)/g, '$1');

            Object.keys(row).forEach(col => {
                if (col.includes('.')) return; // skip alias-prefixed keys
                const val = row[col] === null ? 'null' : (typeof row[col] === 'string' ? `"${row[col]}"` : row[col]);
                const colRegex = new RegExp(`\\b${col}\\b`, 'g');
                jsCond = jsCond.replace(colRegex, val);
            });

            try { return eval(jsCond); } catch { return false; }
        });
    }

    _applyOrderBy(data, orderBy) {
        const parts = orderBy.trim().split(/\s+/);
        const col = parts[0].replace(/\w+\./, '');
        const dir = (parts[1] && parts[1].toUpperCase() === 'DESC') ? -1 : 1;
        return data.sort((a, b) => {
            const aVal = a[col] !== undefined ? a[col] : '';
            const bVal = b[col] !== undefined ? b[col] : '';
            if (aVal < bVal) return -1 * dir;
            if (aVal > bVal) return 1 * dir;
            return 0;
        });
    }

    _checkAggregates(columnsRaw, results) {
        const upper = columnsRaw.toUpperCase();
        
        const aggMatch = columnsRaw.match(/(COUNT|SUM|AVG|MIN|MAX)\s*\(\s*(\*|\w+)\s*\)/i);
        if (!aggMatch) return null;

        const fn = aggMatch[1].toUpperCase();
        const col = aggMatch[2].toLowerCase();

        let value;
        if (fn === 'COUNT') value = results.length;
        else if (fn === 'SUM') value = results.reduce((a, r) => a + (parseFloat(r[col]) || 0), 0);
        else if (fn === 'AVG') value = results.length ? Math.round(results.reduce((a, r) => a + (parseFloat(r[col]) || 0), 0) / results.length * 100) / 100 : 0;
        else if (fn === 'MIN') value = results.length ? Math.min(...results.map(r => parseFloat(r[col]) || 0)) : 0;
        else if (fn === 'MAX') value = results.length ? Math.max(...results.map(r => parseFloat(r[col]) || 0)) : 0;

        const alias = `${fn}(${aggMatch[2]})`;
        return { success: true, data: [{ [alias]: value }], message: "Agrégat calculé." };
    }

    _applyProjection(data, columnsRaw) {
        const colsToKeep = columnsRaw.split(',').map(c => c.trim());
        return data.map(row => {
            let newRow = {};
            colsToKeep.forEach(c => {
                // Handle AS alias
                const asMatch = c.match(/(.+?)\s+AS\s+(\w+)/i);
                const baseExpr = asMatch ? asMatch[1].trim() : c;
                const alias = asMatch ? asMatch[2] : null;

                // Functions
                const upperMatch = baseExpr.match(/UPPER\s*\(\s*(\w+)\s*\)/i);
                const lowerMatch = baseExpr.match(/LOWER\s*\(\s*(\w+)\s*\)/i);
                const lenMatch = baseExpr.match(/LEN\s*\(\s*(\w+)\s*\)/i);
                const getdateMatch = baseExpr.match(/GETDATE\s*\(\s*\)/i);
                const concatMatch = baseExpr.match(/CONCAT\s*\((.+)\)/i);

                const label = alias || baseExpr;

                if (upperMatch) {
                    newRow[label] = row[upperMatch[1]] ? row[upperMatch[1]].toString().toUpperCase() : null;
                } else if (lowerMatch) {
                    newRow[label] = row[lowerMatch[1]] ? row[lowerMatch[1]].toString().toLowerCase() : null;
                } else if (lenMatch) {
                    newRow[label] = row[lenMatch[1]] ? row[lenMatch[1]].toString().length : 0;
                } else if (getdateMatch) {
                    newRow[label] = new Date().toISOString().slice(0, 19);
                } else if (concatMatch) {
                    const args = concatMatch[1].split(',').map(a => {
                        a = a.trim();
                        if (a.startsWith("'") || a.startsWith('"')) return a.slice(1, -1);
                        return row[a] !== undefined ? row[a] : a;
                    });
                    newRow[label] = args.join('');
                } else {
                    // Regular column (possibly with alias prefix)
                    const cleanCol = baseExpr.replace(/\w+\./, '');
                    if (row.hasOwnProperty(baseExpr)) newRow[label] = row[baseExpr];
                    else if (row.hasOwnProperty(cleanCol)) newRow[label] = row[cleanCol];
                }
            });
            return newRow;
        });
    }

    handleInsert(query) {
        const regex = /INSERT\s+INTO\s+(\w+)\s*\((.+)\)\s+VALUES\s*\((.+)\)/i;
        const match = query.match(regex);
        if (!match) throw new Error("Format INSERT invalide.");

        const tableName = match[1].toLowerCase();
        const cols = match[2].split(',').map(s => s.trim());
        const vals = match[3].split(',').map(s => {
            let v = s.trim();
            if (v.startsWith("'") || v.startsWith('"')) return v.slice(1, -1);
            return parseFloat(v);
        });

        if (!this.db[tableName]) throw new Error(`Table '${tableName}' introuvable.`);
        
        let newRow = { id: this.db[tableName].length + 1 };
        cols.forEach((col, i) => newRow[col] = vals[i]);
        this.db[tableName].push(newRow);
        return { success: true, message: "1 ligne insérée." };
    }

    handleUpdate(query) {
        const regex = /UPDATE\s+(\w+)\s+SET\s+(.+?)(?:\s+WHERE\s+(.+))?$/i;
        const match = query.match(regex);
        if (!match) throw new Error("Format UPDATE invalide.");
        
        const tableName = match[1].toLowerCase();
        const assignmentsStr = match[2];
        const whereClause = match[3];

        if (!this.db[tableName]) throw new Error(`Table '${tableName}' introuvable.`);
        
        let count = 0;
        const assignments = assignmentsStr.split(',').map(a => {
            const parts = a.split('=').map(s => s.trim());
            let val = parts[1];
            if (val.startsWith("'") || val.startsWith('"')) val = val.slice(1, -1);
            else if (!isNaN(val)) val = parseFloat(val);
            return { col: parts[0], val };
        });

        this.db[tableName].forEach(row => {
            let matchCondition = true;
            if (whereClause) {
                matchCondition = false;
                let jsCond = whereClause.replace(/(?<![<>!])=(?!=)/g, '==').replace(/<>/g, '!=').replace(/\bAND\b/gi, '&&').replace(/\bOR\b/gi, '||');
                Object.keys(row).forEach(col => {
                    const val = typeof row[col] === 'string' ? `"${row[col]}"` : row[col];
                    jsCond = jsCond.replace(new RegExp(`\\b${col}\\b`, 'g'), val);
                });
                try { matchCondition = eval(jsCond); } catch { matchCondition = false; }
            }
            if (matchCondition) { assignments.forEach(a => { row[a.col] = a.val; }); count++; }
        });

        return { success: true, message: `${count} ligne(s) mise(s) à jour.` };
    }

    handleDelete(query) {
        const regex = /DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+))?/i;
        const match = query.match(regex);
        if (!match) throw new Error("Format DELETE invalide.");

        const tableName = match[1].toLowerCase();
        const whereClause = match[2];
        if (!this.db[tableName]) throw new Error(`Table '${tableName}' introuvable.`);

        const initialLen = this.db[tableName].length;
        
        if (!whereClause) {
            this.db[tableName] = [];
            return { success: true, message: `${initialLen} ligne(s) supprimée(s).` };
        }

        this.db[tableName] = this.db[tableName].filter(row => {
            let jsCond = whereClause.replace(/(?<![<>!])=(?!=)/g, '==').replace(/<>/g, '!=').replace(/\bAND\b/gi, '&&').replace(/\bOR\b/gi, '||');
            Object.keys(row).forEach(col => {
                const val = typeof row[col] === 'string' ? `"${row[col]}"` : row[col];
                jsCond = jsCond.replace(new RegExp(`\\b${col}\\b`, 'g'), val);
            });
            try { return !eval(jsCond); } catch { return true; }
        });

        return { success: true, message: `${initialLen - this.db[tableName].length} ligne(s) supprimée(s).` };
    }

    handleMockDML(query) {
        const upper = query.toUpperCase();
        if (upper.includes("CREATE PROCEDURE") || upper.includes("CREATE TRIGGER")) {
            if (!upper.includes("AS") || !upper.includes("BEGIN") || !upper.includes("END"))
                throw new Error("Structure invalide. Manque AS, BEGIN ou END.");
            return { success: true, message: "Objet programmé créé avec succès." };
        }
        if (upper.includes("WHILE") && upper.includes("BEGIN") && upper.includes("END"))
            return { success: true, message: "Boucle exécutée. (Simulation: 10 itérations)." };
        if (upper.includes("DECLARE") || upper.includes("IF"))
            return { success: true, message: "Commande T-SQL validée syntaxiquement." };
        return { success: true, message: "Commande validée." };
    }
}

const sqlEngine = new MockSQLEngine();

function executeSQL(query) {
    if (!window.sqlEngine) window.sqlEngine = new MockSQLEngine();
    return window.sqlEngine.execute(query);
}

function runQuery() {
    const code = document.getElementById('sql-input').value;
    const res = executeSQL(code);
    const output = document.getElementById('query-output');
    output.innerHTML = '';

    if (res.success) {
        if (res.message) output.innerHTML += `<div class="text-green-400 mb-2"><i class="fas fa-check-circle"></i> ${res.message}</div>`;
        if (Array.isArray(res.data) && res.data.length > 0) {
            const keys = Object.keys(res.data[0]);
            let table = `<table class="w-full text-left text-sm border-collapse"><thead><tr>`;
            keys.forEach(k => table += `<th class="border border-slate-600 p-2 bg-slate-800 text-blue-400">${k}</th>`);
            table += `</tr></thead><tbody>`;
            res.data.forEach(row => {
                table += `<tr>`;
                keys.forEach(k => table += `<td class="border border-slate-700 p-2 text-slate-300">${row[k] !== null && row[k] !== undefined ? row[k] : '<span class="text-slate-600">NULL</span>'}</td>`);
                table += `</tr>`;
            });
            table += `</tbody></table>`;
            output.innerHTML += table;
        }
    } else {
        output.innerHTML = `<div class="text-red-400"><i class="fas fa-exclamation-triangle"></i> Erreur: ${res.error}</div>`;
    }
}
