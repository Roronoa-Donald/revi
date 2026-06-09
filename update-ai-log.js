const fs = require('fs');
const code = fs.readFileSync('preparation-web/assets/js/app.js', 'utf8');

const updated = code.replace(
/try\s*{\s*const data \= await api\('\/api\/ai-chat', \{\s*method: 'POST',\s*body: JSON\.stringify\(\{[\s\S]*?\}\)\s*\}\);\s*const raw/m,
`try {
      const payload = {
        messages: [
          { role: 'system', content: buildAiSystemPrompt(project, stepText) },
          { role: 'user', content: wrapAiUserPrompt(question, project, stepText) }
        ],
        temperature: 0.5,
        max_tokens: 180
      };
      console.log('[AI Debug] Request to /api/ai-chat:', payload);
      const data = await api('/api/ai-chat', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      console.log('[AI Debug] Response from /api/ai-chat:', data);
      const raw`
);

const final = updated.replace(
/\} catch \(error\) \{\s*appendAiMessage\('Service IA indisponible/m,
`} catch (error) {
      console.log('[AI Debug] Error during fetch:', error);
      appendAiMessage('Service IA indisponible`
);

fs.writeFileSync('preparation-web/assets/js/app.js', final);
console.log('Done');
