/* ============================================
   Probabilités — Quiz Utilities (shared)
   ============================================ */

/**
 * Normalize a user's answer for comparison:
 * lowercase, strip whitespace, replace comma with dot
 */
function normalizeAnswer(answer) {
    return answer.toLowerCase()
        .replace(/\s+/g, '')
        .replace(/,/g, '.')
        .trim();
}
