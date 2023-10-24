function toggleAnswer(question) {
    const answer = question.nextElementSibling;

    if (answer.style.display === 'block') {
        answer.style.display = 'none';
    } else {
        answer.style.display = 'block';
    }
}