#!/bin/bash
# Ralph Loop - Autonomous AI Development Loop
# Usage: ./ralph.sh [plan] [max_iterations]
# Examples:
#   ./ralph.sh              # Build mode, unlimited iterations
#   ./ralph.sh 20           # Build mode, max 20 iterations
#   ./ralph.sh plan         # Plan mode, unlimited iterations
#   ./ralph.sh plan 5       # Plan mode, max 5 iterations

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
DIM='\033[2m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Dragon ASCII Art - Epic Dragon
show_dragon() {
    echo -e "${MAGENTA}"
    cat << 'EOF'
                                                    ______________
                        ,   ,                      /              \
                        $,  $,     ,              |  RALPH LOOP   |
                        "ss.$ss. .s'               \______________/
                ,     .ss$$$$$$$$$$s,                    ||
                $. s$$$$$$$$$$$$$$`$$Ss               __//
                "$$$$$$$$$$$$$$$$$$o$$$       ,      /o  \
               s$$$$$$$$$$$$$$$$$$$$$$$$s,  ,s      |  ^  |
              s$$$$$$$$$"$$$$$$""""$$$$$$"$$$$$,    | /|\ |
              s$$$$$$$$$$s""$$$$ssssss"$$$$$$$$"    |  |  |
             s$$$$$$$$$$'         `"""ss"$"$s""     | / \ |
             s$$$$$$$$$$,              `"""""$  .s$$s
             s$$$$$$$$$$$$s,...               `s$$'  `
         `ssss$$$$$$$$$$$$$$$$$$$$####s.     .ss"$.$s"
           `""""$$$$$$$$$$$$$$$$$$$$#####$$$$$$"
                 "$$$$$$$$$$$$$$$$$$$$$####s""
                  "$$$$$$$$$$$$$$$$$$$$$$$$##s
                   "$$$$$$$$$$$$$$$$$$$$$$$$$$s
                    $$""$$$$$$$$$$$$$$$$$$$$$$$s
                    $$  "$"$$$$$$$$$$$$$$$$$$$$s
                    "     "$$$$$$$$$$$$$$$$$$$$$
                           $$$$$$$$$$$$$$$$$$$$s
                            $$$$$$$$$$$$$$$$$$"
                             "$$""$$$$$$$$$$"
                               $$$$$$$$$$$$$
                                "$$$$$$$$$$
                                  "$$$$$$"
EOF
    echo -e "${NC}"
    echo ""
    echo -e "${BOLD}${CYAN}          ██████╗  █████╗ ██╗     ██████╗ ██╗  ██╗    ██╗      ██████╗  ██████╗ ██████╗ ${NC}"
    echo -e "${BOLD}${CYAN}          ██╔══██╗██╔══██╗██║     ██╔══██╗██║  ██║    ██║     ██╔═══██╗██╔═══██╗██╔══██╗${NC}"
    echo -e "${BOLD}${CYAN}          ██████╔╝███████║██║     ██████╔╝███████║    ██║     ██║   ██║██║   ██║██████╔╝${NC}"
    echo -e "${BOLD}${MAGENTA}          ██╔══██╗██╔══██║██║     ██╔═══╝ ██╔══██║    ██║     ██║   ██║██║   ██║██╔═══╝ ${NC}"
    echo -e "${BOLD}${MAGENTA}          ██║  ██║██║  ██║███████╗██║     ██║  ██║    ███████╗╚██████╔╝╚██████╔╝██║     ${NC}"
    echo -e "${BOLD}${MAGENTA}          ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝  ╚═╝    ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝     ${NC}"
    echo ""
    echo -e "${DIM}${WHITE}                              ⚡ Autonomous AI Development ⚡${NC}"
    echo ""
}

# Progress bar function
show_progress() {
    local current=$1
    local max=$2
    local width=40

    if [ $max -le 0 ]; then
        # Unlimited mode - show iteration count with animation
        local spinner=("⠋" "⠙" "⠹" "⠸" "⠼" "⠴" "⠦" "⠧" "⠇" "⠏")
        local spin_idx=$((current % 10))
        echo -e "${CYAN}${spinner[$spin_idx]} ${WHITE}Iteration ${BOLD}$current${NC} ${DIM}(unlimited mode)${NC}"
    else
        # Limited mode - show progress bar
        local progress=$((current * width / max))
        local remaining=$((width - progress))
        local percent=$((current * 100 / max))

        printf "${CYAN}["
        printf "${GREEN}%${progress}s" | tr ' ' '█'
        printf "${DIM}%${remaining}s" | tr ' ' '░'
        printf "${CYAN}] ${WHITE}${BOLD}%d${NC}${WHITE}/${BOLD}%d${NC} ${DIM}(%d%%)${NC}\n" "$current" "$max" "$percent"
    fi
}

# Parse and display iteration summary with actual work done
show_iteration_summary() {
    local json_file=$1
    local iteration=$2

    echo ""
    echo -e "${CYAN}╔══════════════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║${NC} ${BOLD}${WHITE}ITERATION $iteration SUMMARY${NC}                                                       ${CYAN}║${NC}"
    echo -e "${CYAN}╠══════════════════════════════════════════════════════════════════════════════╣${NC}"

    # Count tool uses
    local tool_count=$(grep -c '"type":"tool_use"' "$json_file" 2>/dev/null || echo "0")

    # Count files modified (from Edit/Write tools)
    local files_modified=$(grep -E '"name":"(Edit|Write)"' "$json_file" | grep -o '"file_path":"[^"]*"' | sed 's/"file_path":"//;s/"//' | sort -u 2>/dev/null)
    local files_count=$(echo "$files_modified" | grep -c . 2>/dev/null || echo "0")

    # Extract any error messages
    local has_errors=$(grep -c '"is_error":true' "$json_file" 2>/dev/null || echo "0")

    # Extract the final result/summary from Claude using jq for reliable JSON parsing
    local result_text=$(grep '"type":"result"' "$json_file" | tail -1 | jq -r '.result // empty' 2>/dev/null)

    # Extract assistant text messages to get actual work description
    local work_summary=$(grep '"type":"content_block_delta"' "$json_file" | \
        jq -r '.delta.text // empty' 2>/dev/null | \
        grep -v "^$" | \
        tail -10 2>/dev/null)

    # Show statistics
    echo -e "${CYAN}║${NC}  ${YELLOW}⚡ Tool Calls:${NC}     $tool_count"
    echo -e "${CYAN}║${NC}  ${BLUE}📁 Files Changed:${NC}  $files_count"

    if [ "$has_errors" -gt 0 ]; then
        echo -e "${CYAN}║${NC}  ${RED}⚠  Errors:${NC}        $has_errors"
    else
        echo -e "${CYAN}║${NC}  ${GREEN}✓  Status:${NC}        Completed successfully"
    fi

    echo -e "${CYAN}╠══════════════════════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${CYAN}║${NC} ${BOLD}${WHITE}WORK COMPLETED:${NC}"

    # Show files that were modified
    if [ -n "$files_modified" ] && [ "$files_count" -gt 0 ]; then
        echo -e "${CYAN}║${NC}  ${DIM}Files modified:${NC}"
        echo "$files_modified" | while read -r file; do
            if [ -n "$file" ]; then
                local basename=$(basename "$file" 2>/dev/null)
                echo -e "${CYAN}║${NC}    ${GREEN}•${NC} ${basename}"
            fi
        done
    fi

    # Extract and show bash commands that were run
    local bash_commands=$(grep '"name":"Bash"' "$json_file" | \
        jq -r '.input.command // empty' 2>/dev/null | \
        grep -v "^$" 2>/dev/null)

    if [ -n "$bash_commands" ]; then
        echo -e "${CYAN}║${NC}  ${DIM}Commands executed:${NC}"
        echo "$bash_commands" | while read -r cmd; do
            if [ -n "$cmd" ]; then
                local short_cmd=$(echo "$cmd" | head -c 74)
                echo -e "${CYAN}║${NC}    ${YELLOW}$${NC} ${short_cmd}"
            fi
        done
    fi

    # Show the result summary if available
    if [ -n "$result_text" ]; then
        echo -e "${CYAN}╠══════════════════════════════════════════════════════════════════════════════╣${NC}"
        echo -e "${CYAN}║${NC} ${BOLD}${WHITE}RESULT:${NC}"
        # Wrap text to fit in box
        echo "$result_text" | fold -s -w 74 | while IFS= read -r line; do
            echo -e "${CYAN}║${NC}  ${line}"
        done
    fi

    echo -e "${CYAN}╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

# Show iteration start
show_iteration_start() {
    local iteration=$1
    local max=$2

    echo ""
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    show_progress "$iteration" "$max"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${DIM}Starting iteration...${NC}"
    echo ""
}

# Parse arguments
if [ "$1" = "plan" ]; then
    MODE="plan"
    PROMPT_FILE="PROMPT_plan.md"
    MAX_ITERATIONS=${2:-0}
elif [[ "$1" =~ ^[0-9]+$ ]]; then
    MODE="build"
    PROMPT_FILE="PROMPT_build.md"
    MAX_ITERATIONS=$1
else
    MODE="build"
    PROMPT_FILE="PROMPT_build.md"
    MAX_ITERATIONS=0
fi

ITERATION=0
CURRENT_BRANCH=$(git branch --show-current)

# Clear screen and show dragon
clear
show_dragon

# Show configuration
echo -e "${WHITE}┌─────────────────────────────────────────┐${NC}"
echo -e "${WHITE}│${NC}  ${CYAN}Mode:${NC}     ${BOLD}$MODE${NC}"
echo -e "${WHITE}│${NC}  ${CYAN}Prompt:${NC}   ${DIM}$PROMPT_FILE${NC}"
echo -e "${WHITE}│${NC}  ${CYAN}Branch:${NC}   ${GREEN}$CURRENT_BRANCH${NC}"
if [ $MAX_ITERATIONS -gt 0 ]; then
    echo -e "${WHITE}│${NC}  ${CYAN}Max:${NC}      ${YELLOW}$MAX_ITERATIONS iterations${NC}"
else
    echo -e "${WHITE}│${NC}  ${CYAN}Max:${NC}      ${DIM}unlimited${NC}"
fi
echo -e "${WHITE}└─────────────────────────────────────────┘${NC}"

# Verify prompt file exists
if [ ! -f "$PROMPT_FILE" ]; then
    echo -e "${RED}Error: $PROMPT_FILE not found${NC}"
    exit 1
fi

# Create temp directory for JSON output
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

while true; do
    ITERATION=$((ITERATION + 1))

    if [ $MAX_ITERATIONS -gt 0 ] && [ $ITERATION -gt $MAX_ITERATIONS ]; then
        echo ""
        echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${GREEN}✓ Completed all $MAX_ITERATIONS iterations${NC}"
        echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        break
    fi

    show_iteration_start "$ITERATION" "$MAX_ITERATIONS"

    # Run Ralph iteration and capture JSON output with live streaming
    JSON_OUTPUT="$TEMP_DIR/iteration_$ITERATION.json"

    # Run Claude silently, capturing JSON output for summary
    echo -e "${DIM}Running iteration (output suppressed, summary will follow)...${NC}"
    cat "$PROMPT_FILE" | claude -p \
        --dangerously-skip-permissions \
        --output-format=stream-json \
        --model opus \
        --verbose > "$JSON_OUTPUT" 2>&1

    # Show iteration summary
    show_iteration_summary "$JSON_OUTPUT" "$ITERATION"

    # Push changes after each iteration
    echo -e "${DIM}Pushing changes to origin/$CURRENT_BRANCH...${NC}"
    git push origin "$CURRENT_BRANCH" 2>/dev/null || {
        echo -e "${YELLOW}Creating remote branch...${NC}"
        git push -u origin "$CURRENT_BRANCH" 2>/dev/null
    }
    echo -e "${GREEN}✓ Changes pushed${NC}"
done
