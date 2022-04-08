
// First let's get all text nodes in the page.
// 1.create Treewalker to get all text in page 
// 2. get each word from a textnode
// 3. highlight each word
const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
const allTextNodes = [];
let currentNode = treeWalker.nextNode();
while (currentNode) {
  // There may also be hidden text nodes in the page
  // like text inside a <script> tag. So ignore those.
  if (getComputedStyle(currentNode.parentNode).display !== 'none') {
    allTextNodes.push(currentNode);
  }
  currentNode = treeWalker.nextNode();
}

// Then, loop through them, every time splitting them into
// individual words, and creating a list of words per node.
const allWords = [];
for (const textNode of allTextNodes) {
  for (const word of textNode.textContent.matchAll(/[a-zA-Z]+/g)) {
    allWords.push({
      word: word[0],
      parentNode: textNode,
      offset: word.index
    });
  }
}

// Finally, loop through the words and highlight them one by
// one by creating a Range and Selection object.
let index = 0;
const range = new Range();
setInterval(() => {
  if (index >= allWords.length) {
    index = 0;
  }
  const {word, parentNode, offset} = allWords[index];
  
  range.setStart(parentNode, offset);
  range.setEnd(parentNode, offset + word.length);
  document.getSelection().removeAllRanges();
  document.getSelection().addRange(range);
  
  index++;
}, 100);


Resources