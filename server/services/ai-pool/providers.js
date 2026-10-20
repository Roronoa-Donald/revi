/**
 * Définition des fournisseurs d'IA supportés.
 * Tous exposent des endpoints compatibles OpenAI (/chat/completions et /models).
 */

const PROVIDERS = {
  openrouter: {
    id: 'openrouter',
    name: 'OpenRouter',
    defaultBaseUrl: 'https://openrouter.ai/api/v1',
    description: 'Agrégateur multi-modèles (DeepSeek, Claude, LLaMA, GPT, etc.)',
    defaultModels: [
      { id: 'deepseek/deepseek-chat', name: 'DeepSeek Chat (V3)' },
      { id: 'deepseek/deepseek-r1', name: 'DeepSeek R1 (Raisonnement)' },
      { id: 'google/gemini-2.0-flash-001', name: 'Gemini 2.0 Flash' },
      { id: 'meta-llama/llama-3.3-70b-instruct', name: 'LLaMA 3.3 70B' },
      { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini' },
      { id: 'anthropic/claude-3.5-haiku', name: 'Claude 3.5 Haiku' }
    ],
    getHeaders(apiKey) {
      return {
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://revi-mu.vercel.app',
        'X-Title': 'RD-AI Cours Interactifs'
      };
    }
  },
  nvidia: {
    id: 'nvidia',
    name: 'NVIDIA NIM',
    defaultBaseUrl: 'https://integrate.api.nvidia.com/v1',
    description: 'Microservices NVIDIA NIM hébergés à haute vitesse',
    defaultModels: [
      { id: 'mistralai/mistral-large-2-instruct', name: 'Mistral Large 2' },
      { id: 'mistralai/codestral-22b-instruct-v0.1', name: 'Codestral 22B' },
      { id: 'nvidia/llama-3.1-nemotron-70b-instruct', name: 'Llama 3.1 Nemotron 70B' },
      { id: 'deepseek-ai/deepseek-v4.1-flash', name: 'DeepSeek V4.1 Flash' },
      { id: 'deepseek-ai/deepseek-coder-6.7b-instruct', name: 'DeepSeek Coder 6.7B' }
    ],
    getHeaders(apiKey) {
      return {
        Authorization: `Bearer ${apiKey}`
      };
    }
  },
  ollama: {
    id: 'ollama',
    name: 'Ollama Cloud / Endpoint',
    defaultBaseUrl: 'https://api.ollama.com/v1',
    description: 'Endpoint Ollama Cloud ou instance Ollama locale/VPS (/v1)',
    defaultModels: [
      { id: 'qwen2.5-coder:latest', name: 'Qwen 2.5 Coder' },
      { id: 'deepseek-r1:latest', name: 'DeepSeek R1' },
      { id: 'llama3.3:latest', name: 'LLaMA 3.3' },
      { id: 'mistral:latest', name: 'Mistral 7B' },
      { id: 'codellama:latest', name: 'CodeLlama' }
    ],
    getHeaders(apiKey) {
      const headers = {};
      if (apiKey && apiKey.trim()) {
        headers.Authorization = `Bearer ${apiKey.trim()}`;
      }
      return headers;
    }
  },
  custom: {
    id: 'custom',
    name: 'Compatible OpenAI Personnalisé',
    defaultBaseUrl: '',
    description: 'Tout endpoint compatible API OpenAI (Groq, Together, vLLM, LocalAI...)',
    defaultModels: [],
    getHeaders(apiKey) {
      const headers = {};
      if (apiKey && apiKey.trim()) {
        headers.Authorization = `Bearer ${apiKey.trim()}`;
      }
      return headers;
    }
  }
};

function getProviderDef(providerId) {
  return PROVIDERS[providerId] || PROVIDERS.openrouter;
}

module.exports = {
  PROVIDERS,
  getProviderDef
};
