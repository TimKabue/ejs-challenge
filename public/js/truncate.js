$(document).ready(function() {
    const paragraph = $('.my-paragraph');
    const text = paragraph.text();
    const truncatedText = text.substring(0, 100) + '...';
    paragraph.text(truncatedText);
  });
  