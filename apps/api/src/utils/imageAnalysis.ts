import Anthropic from '@anthropic-ai/sdk'
import sharp from 'sharp'
import config from '@/config/env'

const client = new Anthropic()

export interface ImageAnalysisResult {
  colors: string[]
  typography: {
    fonts: string[]
    sizes: number[]
  }
  layout: {
    type: string
    elements: number
  }
  components: string[]
  extractedText: string
}

export async function analyzeImage(imagePath: string): Promise<ImageAnalysisResult> {
  try {
    // Convert image to base64
    const imageBuffer = await sharp(imagePath).png().toBuffer()
    const base64Image = imageBuffer.toString('base64')

    // Use Claude's vision API to analyze the image
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/png',
                data: base64Image,
              },
            },
            {
              type: 'text',
              text: `Analyze this design image and provide:
1. List of dominant colors (hex codes)
2. Typography details (font families, sizes)
3. Layout structure (grid, flexbox, etc.)
4. Components identified (buttons, cards, forms, etc.)
5. All visible text

Return as JSON with keys: colors, typography, layout, components, extractedText`,
            },
          ],
        },
      ],
    })

    // Parse the response
    const content = message.content[0]
    if (content.type === 'text') {
      const result = JSON.parse(content.text) as ImageAnalysisResult
      return result
    }

    throw new Error('Unexpected response format')
  } catch (error) {
    console.error('Image analysis failed:', error)
    throw error
  }
}

export async function extractTextFromImage(imagePath: string): Promise<string> {
  // This would use Tesseract.js for OCR
  // Implementation depends on requirements
  return ''
}
