  function handleClickOutside(elementSafeArea, elementTarget, toggler = null,
    removables= {}) {
    //this function closes elementTarget if required conditions are met
    function outsideClickListener(event) {
      let clickedOutside = true
      const deltaX = event.offsetX - lastMouseDownX
      const deltaY = event.offsetY - lastMouseDownY
      const distSq = (deltaX * deltaX) + (deltaY * deltaY)
      const isDrag = distSq > 3
      const isDragException = isDrag && !lastMouseDownWasOutside

      if (Symbol.iterator in Object(elementSafeArea)) {
        for (const element of elementSafeArea) {
          if (element.contains(event.target)) {
            clickedOutside = false
            break
          }
        }
      } else if (elementSafeArea.contains(event.target)) {
        clickedOutside = false
      }
      if (clickedOutside && isVisible(elementSafeArea)) {
        elementTarget.classList.remove('show');
        searchInput.classList.remove('result-open');
        removeClickListener();
      }
    }

    const checkClosest = elem => {
      if (Symbol.iterator in Object(elem)) {
        for (const element of elem) {
          if ($(event.target).closest(element).length) {
            return false
          }
        }
        return true
      } else {
        return !$(event.target).closest(elem).length
      }
    }
    
    //this function checks visibility of the given element
    const isVisible = elem => {
      let visibility = true
      if (Symbol.iterator in Object(elem)) {
        for (const element of elem) {
          if (!(!!element && !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length))) {
            return false
          }
        }
        return true
      } else {
        return !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length)
      }
    };
    
    const mouseDownListener = (event) => {
      lastMouseDownX = event.offsetX
      lastMouseDownY = event.offsetY
      lastMouseDownWasOutside = checkClosest(elementSafeArea)
    }

    const removeClickListener = () => {
      document.removeEventListener('mousedown', outsideClickListener);
      // document.removeEventListener('mousedown', mouseDownListener);
    }

    let lastMouseDownX = 0;
    let lastMouseDownY = 0;
    let lastMouseDownWasOutside = false;

    // document.addEventListener('mousedown', mouseDownListener);
    document.addEventListener('mousedown', outsideClickListener);
  }