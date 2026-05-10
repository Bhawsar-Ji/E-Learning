export const buildPrompt = ({
    topic,
    language,
    level
}) => {
    return `
    You are an expert programming instructor.

Generate structured learning content for "${topic}" in STRICT JSON format.

⚠️ VERY IMPORTANT:
- Output MUST be valid JSON
- your response will be parsed using JSON.parse()
- INVALID JSON will cause system failure
- Use ONLY double quotes
- No extra text outside JSON
- No comments, no trailing commas
- Do Not use emojis inside text values

STRUCTURE RULES:

- Minimum 6 and maximum 10 headings (main learning components)
- Each heading must have EXACTLY 5 points
- Each point must include:
  - explanation (15–20 words)
- Add example ONLY where applicable

- Every example MUST include:
  - explanation (1–2 lines, simple words)
  - code (small and focused on one concept)
  - create a quiz strictly based on the generated course content

CONTENT RULES:

- Explanations must be beginner-friendly and meaningful
- Do NOT write short phrases
- content MUST be Markdown formatted
- Keep content clean and structured
- Code must be simple and correct
- Keep code examples very small and focused on one concept only

QUIZ RULES:

- Generate EXACTLY 10 multiple-choice questions based on the course content
- Questions should be distributed across different sections
- Each question must include:
  - id (number)
  - question (string)
  - options (array of 4 objects with id A, B, C, D)
  - correctAnswer (must match one option id)

- Only ONE correct answer per question
- Incorrect options should be realistic but wrong
- Follow the selected level difficulty

  CONTENT RULES BASED ON LEVEL:

- If Level is "Beginner":
  - Use very simple language
  - Explain basic concepts clearly
  - Avoid technical jargon
  - Use real-life simple examples

- If Level is "Intermediate":
  - Use moderate technical terms
  - Focus on practical understanding
  - Include slightly deeper explanations

- If Level is "Advanced":
  - Use technical and precise language
  - Focus on optimization, patterns, and best practices
  - Avoid basic explanations

LANGUAGE RULES:

- If Language is "Hindi":
  - Mix Hindi + English naturally (Roman script)
  - Keep it easy and conversational

- If Language is "English":
  - Use clear and simple English

  JSON FORMAT:

{
  "topic": "${topic}",
  "language": "${language}",
  "level": "${level}",
  "sections": [
    {
      "heading": "string",
      "points": [
        {
          "text": "15–20 word explanation"
        },
        {
          "text": "15–20 word explanation"
        },
        {
          "text": "15–20 word explanation"
        },
        {
          "text": "15–20 word explanation"
        },
        {
          "text": "15–20 word explanation"
        }
      ],
      "example": {
        "explanation": "1–2 lines explaining the code",
        "code": "code snippet here"
      }
    }
  ],
   "quiz": [
    {
      "id": 1,
      "question": "Question text",
      "options": [
        { "id": "A", "text": "Option A" },
        { "id": "B", "text": "Option B" },
        { "id": "C", "text": "Option C" },
        { "id": "D", "text": "Option D" }
      ],
      "correctAnswer": "A"
    }
  ]

}

RETURN ONLY VALID JSON
`}