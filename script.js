(function() {
    var parentNodeElement = document.querySelector('.expand-collapse-text');
    parentNodeElement.style = 'position: relative;transition: all 0.5s;box-sizing: border-box;';

    var allChildElement = parentNodeElement.children;

    for (var i = 1; i < allChildElement.length; ++i) {
        allChildElement[i].style = 'opacity: 0; pointer-events: none;';
    }

    var firstChildNode = parentNodeElement.firstElementChild;
    firstChildNode.style.opacity = '1';
    var childNodesHeight = firstChildNode.getBoundingClientRect().height;

    parentNodeElement.style.height = childNodesHeight +'px';

    var readMoreButton = document.createElement('div');
    readMoreButton.classList.add('read__more-button');
    readMoreButton.classList.add('expand');
    readMoreButton.innerHTML = '<span>Читать далее...</span>';
    readMoreButton.style = 'font-size: 16px; cursor: pointer;margin:20px 0;';
    readMoreButton.style.display = 'block';
    parentNodeElement.insertAdjacentElement('afterend',readMoreButton);

    readMoreButton.addEventListener('click', function () {
       if (readMoreButton.classList.contains('expand')){
           readMoreButton.classList.remove('expand');
           readMoreButton.classList.add('collapse');
           readMoreButton.innerHTML = '<span>Скрыть текст</span>';

           calculateHeightExpand();
       } else if (readMoreButton.classList.contains('collapse')) {
           readMoreButton.classList.remove('collapse');
           readMoreButton.classList.add('expand');
           readMoreButton.innerHTML = '<span>Читать далее...</span>';

           calculateHeightCollapse();
       }
    });

    var calculateHeightExpand = function () {
        var childNodeHeightArray = [];

        for (var i = 0; i < allChildElement.length; i++) {
            allChildElement[i].style.opacity = '1';
            allChildElement[i].style.pointerEvents = null;

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
    };

    var calculateHeightCollapse = function () {

        parentNodeElement.style.height = childNodesHeight +'px';

        for (var i = 0; i < allChildElement.length; i++) {
            let countArray = allChildElement.length - i;

            firstChildNode.style.opacity = '1';
            allChildElement[i].style = 'opacity: 0; transition:' + 0.03 * countArray + i + 's; transition-delay:' + 0.03 *  countArray + i + 's;pointer-events: none;';
        }
    };
})();