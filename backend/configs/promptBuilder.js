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

LEVEL BASED STRUCTURE RULES:

- If level is "Beginner":
  - Generate EXACTLY 4 headings
  - Each heading must have EXACTLY 3 points

- If level is "Intermediate":
  - Generate EXACTLY 6 headings
  - Each heading must have EXACTLY 5 points

- If level is "Advanced":
  - Generate EXACTLY 10 headings
  - Each heading must have EXACTLY 7 points
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
- Code examples must follow the selected level difficulty
- Beginner examples should be very small and easy
- Intermediate examples should be practical and moderately detailed
- Advanced examples should include deeper logic, patterns, or optimization concepts

QUIZ RULES:

- Generate EXACTLY 10 multiple-choice questions based on the course content
- Quiz questions must cover all generated sections
- Distribute questions across sections as evenly as possible
- Do not create all questions from only one or two sections
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
  - Keep code examples very short and beginner-friendly

- If Level is "Intermediate":
  - Use moderate technical terms
  - Focus on practical understanding
  - Include slightly deeper explanations
  - Use practical coding examples with moderate complexity

- If Level is "Advanced":
  - Use technical and precise language
  - Focus on optimization, patterns, and best practices
  - Avoid basic explanations
  - Use advanced examples with real-world coding practices

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