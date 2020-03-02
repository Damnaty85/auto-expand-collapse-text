(function() {
    var parentNodeElement = document.querySelector('.expand-collapse');
    parentNodeElement.style = 'position: relative;transition: all 0.4s;box-sizing: border-box;';

    var allChildElement = parentNodeElement.children;

    for (var i = 1; i < allChildElement.length; ++i) {
        allChildElement[i].style = 'opacity: 0;pointer-events: none;';
    }

    var childNode = parentNodeElement.firstElementChild;
    childNode.style.opacity = '1';
    var childNodesHeight = childNode.getBoundingClientRect().height;

    parentNodeElement.style.height = childNodesHeight +'px';

    var readMoreButton = document.createElement('span');
    readMoreButton.textContent = 'Открыть скрытое...';
    readMoreButton.style = 'font-size: 16px; cursor: pointer;margin-top:20px;';
    readMoreButton.style.display = 'block';
    parentNodeElement.insertAdjacentElement('afterend',readMoreButton);

    var readCollapseButton = document.createElement('span');
    readCollapseButton.textContent = 'Скрыть открытое...';
    readCollapseButton.style = 'font-size: 16px; cursor: pointer;';
    readCollapseButton.style.display = 'none';
    parentNodeElement.insertAdjacentElement('afterend',readCollapseButton);

    var calculateHeightExpand = function () {
        var childNodeHeightArray = [];

        for (var i = 0; i < allChildElement.length; i++) {
            allChildElement[i].style.opacity = '1';
            allChildElement[i].style.pointerEvents = 'none';

            allChildElement[i].style.transition = '0.' + i + 's';
            allChildElement[i].style.transitionDelay = '0.' + i + 's';

            var computedStyles = window.getComputedStyle(allChildElement[i]);
            var heightChildNode = parseInt(computedStyles.getPropertyValue('height'));
            var marginTopChildNode = parseInt(computedStyles.getPropertyValue('margin-top'));

            var totalHeightElementNode = heightChildNode + marginTopChildNode;

            childNodeHeightArray.push(totalHeightElementNode);

            var totalAllElementHeight = childNodeHeightArray.reduce(function(a, b) {
                return a + b;
            });

            parentNodeElement.style.height = totalAllElementHeight+ 'px';
        }

        readCollapseButton.style.display = 'block';
        readMoreButton.style.display = 'none';

        readCollapseButton.style.bottom = '0';
    };

    var calculateHeightCollapse = function () {
        readMoreButton.style.display = 'block';
        readCollapseButton.style.display = 'none';

        childNode.style.opacity = '1';
        parentNodeElement.style.height = childNodesHeight +'px';

        for (var i = 1; i < allChildElement.length; ++i) {
            allChildElement[i].style = 'opacity: 0;pointer-events: none;';

            // allChildElement[i].style.transition = '0.' + i + 's';
            // allChildElement[i].style.transitionDelay = '0.' + i + 's';
        }
    };

    readMoreButton.addEventListener('click', calculateHeightExpand);
    readCollapseButton.addEventListener('click', calculateHeightCollapse);
})();