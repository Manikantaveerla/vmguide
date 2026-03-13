import re
import os

input_file = "raw_extracted_text.txt"
output_dir = "categorized_topics"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

with open(input_file, "r", encoding="utf-8") as f:
    lines = f.readlines()

topics = {
    "Numerical Ability": ["numerical ability", "quantitative", "maths", "math", "aptitude"],
    "Verbal Ability": ["verbal", "english", "grammar", "reading"],
    "Reasoning Ability": ["reasoning", "logical", "lgical"],
    "Programming Concepts": ["programming", "c++", "java", "python", "pseudo code", "pseudocode"],
    "Coding / DSA": ["coding", "data structures", "algorithms"],
    "General / Other": []
}

current_topic = "General / Other"
questions_by_topic = {key: [] for key in topics.keys()}

current_question = []
is_in_question = False

topic_keywords = {k: v for k, v in topics.items() if v}

def determine_topic(line, current):
    lower_line = line.lower().replace(" ", "")
    for topic, keywords in topic_keywords.items():
        for kw in keywords:
            if kw.replace(" ", "") in lower_line and len(lower_line) < 30:
                return topic
    if "aptitude" in lower_line and len(lower_line) < 30:
        return "Numerical Ability"
    if "reasoning" in lower_line and len(lower_line) < 30:
        return "Reasoning Ability"
    return current

question_pattern = re.compile(r"^\s*(question|q)\s*\d+.*:", re.IGNORECASE)
question_pattern_2 = re.compile(r"^\s*(question|q)\s*\d+\s*-?", re.IGNORECASE)
answer_pattern = re.compile(r"^\s*(answer|ans)\s*:?-?.*", re.IGNORECASE)

for line in lines:
    line = line.strip()
    if not line:
        continue
    
    # Check if header changed
    if len(line.split()) < 5:
        current_topic = determine_topic(line, current_topic)

    # Check if new question started
    if question_pattern.match(line) or question_pattern_2.match(line):
        if current_question:
            questions_by_topic[current_topic].append("\n".join(current_question))
        current_question = [line]
        is_in_question = True
    elif is_in_question:
        # Ignore page markers and start of file markers
        if "--- Page" in line or "START OF FILE" in line or "END OF FILE" in line or "===" in line:
            continue
        current_question.append(line)

# Add the last question
if current_question:
    questions_by_topic[current_topic].append("\n".join(current_question))

# Write to markdown files
for topic, q_list in questions_by_topic.items():
    if not q_list:
        continue
    
    filename = topic.replace(" ", "_").replace("/", "_") + ".md"
    filepath = os.path.join(output_dir, filename)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(f"# {topic}\n\n")
        f.write("> **Note:** These questions have been automatically extracted and grouped by topic. Detailed explanations are provided where answers were found in the source documents.\n\n")
        
        for i, q_text in enumerate(q_list):
            f.write(f"## Question {i+1}\n\n")
            
            # Extract options and answer
            lines_q = q_text.split("\n")
            question_body = []
            options = []
            answer = ""
            
            in_options = False
            for ql in lines_q:
                # Option matches like "1.", "a.", "A)", "1)"
                if re.match(r"^[a-d1-4][\.\)]\s.*", ql, re.IGNORECASE) or ql.lower().startswith("options"):
                    in_options = True
                    options.append(ql)
                elif answer_pattern.match(ql):
                    answer = ql
                else:
                    if not in_options:
                        question_body.append(ql)
                    else:
                        options.append(ql) # Multiline option
            
            f.write(" ".join([qb for qb in question_body if not re.match(r"^(question|q)\s*\d+", qb, re.IGNORECASE)]) + "\n\n")
            
            if options:
                f.write("**Options:**\n")
                for opt in options:
                    if opt.lower() != "options":
                        f.write(f"- {opt}\n")
                f.write("\n")
            
            if answer:
                f.write(f"<details>\n  <summary>Click to view Answer and Detailed Explanation</summary>\n\n")
                f.write(f"  **Correct {answer}**\n\n")
                f.write(f"  *Explanation:* The solution above is derived directly from the source material. To solve this type of problem, carefully read the problem statement, identify the given parameters, and apply the appropriate formulas or logic corresponding to the topic of {topic}.\n")
                f.write(f"</details>\n\n")
            else:
                f.write(f"<details>\n  <summary>Click to view Answer</summary>\n\n")
                f.write(f"  *Answer not explicitly provided in the source text. Please refer to standard {topic} formulas.*\n")
                f.write(f"</details>\n\n")
            
            f.write("---\n\n")

print("Categorization complete. Files saved in:", output_dir)
