document.addEventListener('DOMContentLoaded', () => {
    // SVG for the copy icon
    const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;

    // Function to wrap code blocks
    function wrapCodeBlocks() {
        document.querySelectorAll('pre > code').forEach((codeBlock) => {
            const pre = codeBlock.parentNode;
            const wrapper = document.createElement('div');
            wrapper.className = 'code-block-wrapper';

            // Create header
            const header = document.createElement('div');
            header.className = 'code-block-header';

            // Determine code type from class
            const codeClass = codeBlock.className;
            const codeType = codeClass.includes('language-') 
                ? codeClass.split('language-')[1].split(' ')[0]
                : 'code';

            // Add code type label
            const typeLabel = document.createElement('span');
            typeLabel.className = 'code-block-type';
            typeLabel.textContent = codeType;
            header.appendChild(typeLabel);

            // Add copy button
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.innerHTML = `${copyIcon} Copy`;
            copyButton.addEventListener('click', () => copyCode(codeBlock, copyButton));
            header.appendChild(copyButton);

            // Wrap everything
            pre.parentNode.insertBefore(wrapper, pre);
            wrapper.appendChild(header);
            wrapper.appendChild(pre);
        });
    }

    // Function to copy code
    async function copyCode(codeBlock, button) {
        const code = codeBlock.textContent;
        
        try {
            await navigator.clipboard.writeText(code);
            button.innerHTML = `${copyIcon} Copied!`;
            button.classList.add('success');
            
            setTimeout(() => {
                button.innerHTML = `${copyIcon} Copy`;
                button.classList.remove('success');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
            button.innerHTML = `${copyIcon} Error!`;
            
            setTimeout(() => {
                button.innerHTML = `${copyIcon} Copy`;
            }, 2000);
        }
    }

    // Initialize
    wrapCodeBlocks();
}); 