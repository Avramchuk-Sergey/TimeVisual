function updateHourglass(progress) {
    const sandTop = document.querySelector("#sandTop");
    const sandBottom = document.querySelector("#sandBottom");

    if (!sandTop || !sandBottom) {
        return;
    }

    const topMaxHeight = 65;
    const bottomMaxHeight = 65;

    const topHeight = topMaxHeight * (1 - progress);
    const bottomHeight = bottomMaxHeight * progress;

    sandTop.setAttribute("y", 25 + (topMaxHeight - topHeight));
    sandTop.setAttribute("height", topHeight);

    sandBottom.setAttribute("y", 155 - bottomHeight);
    sandBottom.setAttribute("height", bottomHeight);
}