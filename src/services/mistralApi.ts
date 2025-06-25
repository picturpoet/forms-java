interface MistralMessage {
  role: 'user' | 'assistant' | 'system';
  content: string | Array<{
    type: 'text' | 'image_url';
    text?: string;
    image_url?: {
      url: string;
    };
  }>;
}

interface MistralResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class MistralApiService {
  private apiKey: string;
  private baseUrl = 'https://api.mistral.ai/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async analyzeDocument(
    textContent: string,
    images: string[] = [],
    model: string = 'mistral-large-latest'
  ): Promise<string> {
    const messages: MistralMessage[] = [
      {
        role: 'system',
        content: `You are an expert FEMA compliance analyst specializing in Form APR (Annual Performance Report) reviews under India's Overseas Investment regulations (FEMA, 1999; OI Rules, 2022).

Your task is to:
1. Analyze the provided Form APR document thoroughly
2. Identify compliance issues, missing information, and inconsistencies
3. Check against FEMA regulations and RBI guidelines
4. Provide specific, actionable recommendations

Format your response as a detailed compliance report with:
- Executive Summary
- Section-by-section analysis
- Compliance status for each field
- Missing documentation checklist
- Recommended actions before submission

Use these status indicators:
- ✅ OK - Compliant
- ⚠️ Requires Verification - Needs attention
- ❌ Incomplete/Non-compliant - Must fix

Be thorough, specific, and reference relevant FEMA rules where applicable.`
      }
    ];

    // Add text content
    if (textContent.trim()) {
      messages.push({
        role: 'user',
        content: `Please analyze this Form APR document for FEMA compliance:

${textContent}`
      });
    }

    // Add images for OCR if available
    if (images.length > 0) {
      const imageContent = images.map(imageUrl => ({
        type: 'image_url' as const,
        image_url: { url: imageUrl }
      }));

      messages.push({
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Please also analyze these document images using OCR and include any additional findings:'
          },
          ...imageContent
        ]
      });
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.3, // Lower temperature for more consistent compliance analysis
          max_tokens: 4000
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Mistral API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data: MistralResponse = await response.json();
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from Mistral API');
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error('Mistral API call failed:', error);
      throw error;
    }
  }

  async performOCR(images: string[]): Promise<string> {
    if (images.length === 0) return '';

    const messages: MistralMessage[] = [
      {
        role: 'system',
        content: 'You are an OCR specialist. Extract all text content from the provided images accurately. Maintain the structure and formatting as much as possible. Focus on forms, tables, and official documents.'
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Please extract all text from these document images:'
          },
          ...images.map(imageUrl => ({
            type: 'image_url' as const,
            image_url: { url: imageUrl }
          }))
        ]
      }
    ];

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'mistral-large-latest', // Using large model for better OCR accuracy
          messages,
          temperature: 0.1, // Very low temperature for accurate text extraction
          max_tokens: 3000
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Mistral OCR API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
      }

      const data: MistralResponse = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Mistral OCR failed:', error);
      throw error;
    }
  }
}