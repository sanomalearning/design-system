import { getActiveElement } from '../utils/active-element.js';

/*const*/ let tabsContainer = document.querySelector('.ds-tabs');
const tabsHeaderContainer = document.querySelector('.ds-tabs__container') as Element;
// const tabsWrapper = document.querySelector('.ds-tabs-wrapper');
// const tabs: NodeListOf<HTMLElement> = document.querySelectorAll('.ds-tab');
/*const*/ let slider = tabsContainer?.querySelector('.slider') as HTMLElement;
/*const*/ let indicator = slider?.querySelector('.indicator') as HTMLElement;
// const tabsContents = tabsContainer?.querySelectorAll('.ds-tabs__tab-content');
// const container = document.querySelector('.ds-container');
// const tabsContentWrapper = document.querySelector('.ds-tabs__tab-content-wrapper');
// const container = document.querySelector('.ds-container');
// const menu = document.querySelector('.ds-sidebar') as HTMLElement;

let tabsContainers: NodeListOf<Element>;
let verticalTabsContainers: NodeListOf<Element>;
let horizontalTabsContainers: NodeListOf<Element>;
let tabsWrapper: Element;
let tabsContentWrapper: Element;
let tabs: NodeListOf<HTMLElement>;
let tabsContents: NodeListOf<Element>;
let current: Element;
let currentContent: Element;
let nextUniqueId = 0;
let headerAnchors: NodeListOf<Element>;
const headerAnchorsParentsAll: Array<HTMLElement | undefined> = []; //Element[];
let verticalSliderElement: HTMLElement;
let verticalIndicatorElement: HTMLElement; // TODO: needed to align vertically
let currentVerticalTabLink: Element;
const verticalTabsWrapperAll: Element[] = [];
let currentVerticalTabsContainer: Element;

const verticalTabsAll: HTMLElement[] = [];

window.onload = () => {
  console.log('tabsContainer onload', tabsContainer, tabsContentWrapper, tabsContainer);

  tabsContainers = document.querySelectorAll('.ds-tabs');
  console.log('tabsContainers onload 2 length', tabsContainers, tabsContainers.length);
  // verticalTabsContainers = document.querySelectorAll('.ds-tabs[vertical]'); //Array.of(tabsContainers);
  // .filter(tabs =>
  //   Array.of(tabs).filter(tabs => (tabs as Element).hasAttribute('vertical'))
  // );
  horizontalTabsContainers = document.querySelectorAll('.ds-tabs[horizontal]');

  // console.log('tabsContainers onload 2', tabsContainers, verticalTabsContainers, horizontalTabsContainers);
  tabsWrapper = horizontalTabsContainers[0].querySelector('.ds-tabs-wrapper') as Element;

  // current = tabsWrapper.querySelector('.active') as Element;

  tabsContentWrapper = horizontalTabsContainers[0].querySelector('.ds-tabs__tab-content-wrapper') as Element;

  tabs = horizontalTabsContainers[0].querySelectorAll('.ds-tab');
  tabs[0].classList.add('active');

  tabsContainer = document.createElement('div');
  tabsContainer.classList.add('ds-tabs__container');
  // horizontalTabsContainers[0].appendChild(tabsContainer);
  horizontalTabsContainers[0].insertBefore(tabsContainer, tabsContentWrapper);

  tabsWrapper = document.createElement('div');
  tabsWrapper.classList.add('ds-tabs-wrapper');
  tabsContainer.appendChild(tabsWrapper);

  slider = document.createElement('div');
  slider.classList.add('slider');
  tabsContainer.appendChild(slider);

  indicator = document.createElement('div');
  indicator.classList.add('indicator');
  slider.appendChild(indicator);

  // tabsWrapper.appendChild(tabs[0]);

  tabs.forEach(tab => tabsWrapper.appendChild(tab));

  current = tabsWrapper.querySelector('.active') as Element;

  tabsContents = horizontalTabsContainers[0]?.querySelectorAll('.ds-tabs__tab-content');

  tabsContents[0].classList.add('ds-tabs__tab-content--active');

  console.log('tabs, tabsContents', tabs, tabsContents, tabsWrapper);

  if (!tabsWrapper || !current) {
    return;
  }
  tabs.forEach(tab => {
    console.log('tab w foreach', tab);
    tab.setAttribute('id', `ds-tab-${nextUniqueId++}`);
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-selected', 'false');
  });
  // tabs.forEach(tab => tab.setAttribute('id', `ds-tab-${nextUniqueId++}`));
  // tabs.forEach(tab => tab.setAttribute('role', 'tab'));
  // tabs.forEach(tab => tab.setAttribute('aria-selected', 'false'));
  console.log('111 tabs, tabsContents', tabs, tabsContents, tabsWrapper);

  tabsContents?.forEach((tabContent, id) => {
    tabContent.setAttribute('id', `ds-tab-content-${nextUniqueId++}`);
    tabContent.setAttribute('role', 'tabpanel');
    tabContent.setAttribute('aria-labelledby', tabs[id].getAttribute('id') as string);
    tabContent.classList.add('ds-tabs__tab-content--hidden');
    let tabContentChildren = [];
    tabContentChildren = Array.from(tabContent.childNodes);
    console.log('tabContentChildren', tabContentChildren);
    const tabContainer = document.createElement('div');
    tabContainer.classList.add('ds-tabs__tab-container');
    console.log('tabContainer in tabcontents', tabContainer, tabContentChildren);
    //tabContainer.appendChild(tabContentChildren);
    tabContentChildren.forEach(content => {
      console.log('contenttt', content, tabContentChildren.length);
      tabContainer.appendChild(content);
    });
    console.log('tabContainer', tabContainer, tabContentChildren.length);
    // tabContentChildren.forEach(content => tabContainer.appendChild(content));
    tabContent.appendChild(tabContainer);
    generateVerticalTabs(tabContent);
  });

  // /*headerAnchors*/ /*verticalTabsAll*/ headerAnchorsParentsAll.forEach(tab => {
  //   console.log('tabbsbbbbb', tab, tab?.parentElement);
  //   if (tab) {
  //     verticalObserver.observe(tab);
  //   }
  // });

  console.log('tabs, tabsContents', tabs, tabsContents, tabsWrapper, verticalTabsAll, headerAnchors);

  setScrollable();

  // tabsContentWrapper = horizontalTabsContainers[0].querySelector('.ds-tabs__tab-content-wrapper') as Element;

  // tabsContents?.forEach(tabContent => tabContent.setAttribute('id', `ds-tab-content-${nextUniqueId++}`));
  // tabsContents?.forEach(tab => tab.setAttribute('role', 'tabpanel'));
  // tabsContents?.forEach((tab, id) => tab.setAttribute('aria-labelledby', tabs[id].getAttribute('id') as string));
  // tabsContents?.forEach(tabContent => tabContent.classList.add('ds-tabs__tab-content--hidden'));
  console.log('current at the beginning', current);
  selectTab(current);

  console.log('tabsHeaderContainer', tabsHeaderContainer);

  if (tabsWrapper) {
    (tabsWrapper as HTMLElement).onscroll = event => {
      console.log('scroll 222');
      onScroll(event);
    };
  }

  // tabsContentWrapper = horizontalTabsContainers[0].querySelector('.ds-tabs__tab-content-wrapper') as Element;
  console.log(
    '--tabsContentWrapper',
    tabsContentWrapper,
    horizontalTabsContainers[0].querySelector('.ds-tabs__tab-content-wrapper') as Element
  );

  // if (/*tabsContainer*/ tabsContentWrapper) {
  //   observer.observe(/*tabsHeaderContainer*/ /*tabsContainer*/ tabsContentWrapper); // TODO: change, not working? why?
  // }

  // observer.observe(tabsHeaderContainer);

  tabs?.forEach(tab => {
    tab.onclick = (event: MouseEvent) => {
      selectTab(event.target as Element);
    };
  });

  // verticalTabsAll?.forEach(verticalTab => {
  //   verticalTab.onclick = (event: MouseEvent) => {
  //     console.log('verticalTab in sele event', event, verticalTabsAll);
  //     selectVerticalTab(event.target as Element);
  //   };
  // });

  // headerAnchors = document.querySelectorAll('.header-anchor');
  // const headerAnchorsParents = Array.from(headerAnchors).map(element => {
  //   return element.parentElement;
  // });
  // // TODO: generate vertical tabs from headerAnchorsParents
  //
  // headerAnchorsParents.forEach(headerAnchorParent => {
  //   if (headerAnchorParent) {
  //     const verticalTab = document.createElement('a');
  //     verticalTab.setAttribute('href', `#${headerAnchorParent.id}`);
  //     if (headerAnchorParent.tagName === 'H2') {
  //       verticalTab.classList.add('ds-tab--vertical');
  //     } else {
  //       verticalTab.classList.add('ds-tab__submenu--vertical');
  //     }
  //     console.log('verrrtical tab', verticalTab, headerAnchorParent.tagName);
  //     //verticalTab.headerAnchorParent.document.createElement('div');
  //   }
  // });
  //
  // // const headerAnchorsParents = Array.of(headerAnchors).filter(anchor => anchor[1].parentElement);
  // console.log('headerAnchors', headerAnchors, headerAnchorsParents);
  // headerAnchors.forEach(tab => {
  //   verticalObserver.observe(tab);
  // });

  // generateVerticalTabs();
};

window.onresize = () => {
  if (!tabsWrapper || !current) {
    return;
  }
  // const //tabsHeaderContainer, //wrapper = tabsHeaderContainer?.querySelector('.wrapper') as HTMLElement,
  //   { clientWidth, scrollLeft, scrollWidth } = tabsHeaderContainer,
  //   scrollable = scrollWidth <= clientWidth;
  //
  // console.log(
  //   'tabsHeaderContainer, clientWidth, scrollLeft, scrollWidth, scrollable',
  //   tabsHeaderContainer,
  //   clientWidth,
  //   scrollLeft,
  //   scrollWidth,
  //   scrollable
  // );
  //
  // tabsWrapper.classList.toggle('ds-tabs-wrapper--scrollable', scrollable);

  setScrollable();

  // const current = tabsWrapper.querySelectorAll('.active');
  selectTab(current);
};

window.onkeydown = (event: KeyboardEvent) => {
  onKeydown(event);
};

// tabsWrapper
//   ? (tabsWrapper.scroll = event => {
//       console.log('scroll');
//       onScroll(event);
//     })
//   : null;
//
// document.onscroll = event => {
//   console.log('onscroll', event);
//   onScroll(event);
// };

// (tabsWrapper as HTMLElement).onscroll = event => {
//   console.log('scroll 222');
//   onScroll(event);
// };

/*tabs?.forEach(tab => {
  tab.onclick = (event: MouseEvent) => {
    selectTab(event.target as Element);
  };
});*/

document.addEventListener('sticky-change', e => {
  console.log('event on sticky change', e);
});

// function observeStickyHeaderChanges(container) {
//   observeHeaders(container);
// }
//
// observeStickyHeaderChanges(document.querySelector('#scroll-container'));
//
// function observeHeaders(container) {
//   const observer = new IntersectionObserver(
//     (records, observer) => {
//       for (const record of records) {
//         const targetInfo = record.boundingClientRect;
//         const stickyTarget = record.target.parentElement.querySelector('.sticky');
//         const rootBoundsInfo = record.rootBounds;
//
//         // Started sticking.
//         if (targetInfo.bottom < rootBoundsInfo.top) {
//           fireEvent(true, stickyTarget);
//         }
//
//         // Stopped sticking.
//         if (targetInfo.bottom >= rootBoundsInfo.top && targetInfo.bottom < rootBoundsInfo.bottom) {
//           fireEvent(false, stickyTarget);
//         }
//       }
//     },
//     { threshold: [0], root: container }
//   );
//
//   // Add the top sentinels to each section and attach an observer.
//   const sentinels = addSentinels(container, 'sticky_sentinel--top');
//   sentinels.forEach(el => observer.observe(el));
// }

/*const observer2 = new IntersectionObserver(([e]) => {
  console.log(e, e.intersectionRatio);
  // e.target.classList.toggle('is-pinned', e.intersectionRatio < 1),
  //   {
  //     threshold: [1]
  //   };
  if (e.intersectionRatio > 1) {
    e.target.classList.add('active');
  } else {
    e.target.classList.remove('active');
  }
});*/

function generateVerticalTabs(verticalTabContent: Element): void {
  // const verticalTabContent = document.querySelector('.ds-tabs__tab-content');
  if (!verticalTabContent) {
    return;
  }
  console.log('horizontalTabContent', verticalTabContent);

  const verticalTabsContainers = document.createElement('div');
  verticalTabsContainers.setAttribute('vertical', '');
  verticalTabsContainers.classList.add('ds-tabs');

  const verticalTabsContainer = document.createElement('div');
  verticalTabsContainer.classList.add('ds-tabs__container');
  verticalTabsContainers.appendChild(verticalTabsContainer);

  verticalTabContent.appendChild(verticalTabsContainers);

  const verticalTabsWrapper = document.createElement('div');
  verticalTabsWrapper.classList.add('ds-tabs-wrapper');
  verticalTabsContainer.appendChild(verticalTabsWrapper);
  verticalTabsWrapperAll.push(verticalTabsWrapper);

  const verticalSlider = document.createElement('div');
  verticalSlider.classList.add('vertical-slider');
  verticalTabsContainer.appendChild(verticalSlider);

  verticalSliderElement = verticalSlider;

  const verticalIndicator = document.createElement('div');
  verticalIndicator.classList.add('vertical-indicator');
  verticalSlider.appendChild(verticalIndicator);

  verticalIndicatorElement = verticalIndicator;
  console.log('verticalIndicatorElement', verticalIndicatorElement);

  headerAnchors = verticalTabContent.querySelectorAll('.header-anchor');
  let prevElement: Element;
  const headerAnchorsParents = Array.from(headerAnchors)
    .map(element => {
      console.log('element in headerAnchors', element, element.parentElement?.parentNode);
      // return element.parentElement?.tagName === 'H2' ? element.parentElement;
      if (element.parentElement?.tagName === 'H2') {
        if (element.parentElement.parentNode) {
          (element.parentElement.parentNode as Element).id = element.parentElement.id;
        }
        /*        if (prevElement) {
          const textNodes = getTextNodesBetween(
            // TODO: not necessary?
            verticalTabContent.firstChild,
            prevElement.parentElement,
            element.parentElement
          );
          console.log('textNodes', textNodes);
        }*/
        prevElement = element;
        console.log(prevElement);
        // console.log('textNodes', textNodes);
        return element.parentElement;
      }
      return;
    })
    .filter(element => element !== undefined);
  // TODO: generate vertical tabs from headerAnchorsParents
  /*headerAnchorsParentsAll = */ headerAnchorsParentsAll.push(...headerAnchorsParents);
  console.log('hheader anchor parents', headerAnchorsParents, headerAnchorsParentsAll);

  /*  function getTextNodesBetween(rootNode, startNode, endNode) {
    let pastStartNode = false,
      reachedEndNode = false,
      textNodes = [];

    function getTextNodes(node) {
      node = node.childNodes;
      console.log('node.childNodes', node, node.childNodes, node.childNodes?.length, startNode, endNode, node.nodeType);
      if (node == startNode) {
        pastStartNode = true;
      } else if (node == endNode) {
        reachedEndNode = true;
      } else if (node.nodeType == 1) {
        console.log('1-nooooode', node, pastStartNode, !reachedEndNode, startNode);
        if (pastStartNode && !reachedEndNode /!*&& !/^\s*$/.test(node.nodeValue)*!/) {
          console.log('nooooode', node);
          textNodes.push(node);
        }
      } else {
        for (let i = 0, len = node.length; !reachedEndNode && i < len; ++i) {
          console.log('node.childNodes[i]', node[i]);
          getTextNodes(node[i]);
          // textNodes.push(node);
        }
      }
    }

    getTextNodes(rootNode);
    return textNodes;
  }*/

  // const x = document.getElementById('x'),
  //   y = document.getElementById('y');

  // const textNodes = getTextNodesBetween(verticalTabContent, x, y);
  // console.log(textNodes);

  const verticalTabs: HTMLElement[] = [];

  headerAnchorsParents.forEach(headerAnchorParent => {
    console.log('headerAnchorParent', headerAnchorParent);
    if (headerAnchorParent) {
      const verticalTab = document.createElement('a');
      verticalTab.setAttribute('href', `#${headerAnchorParent.id}`);
      verticalTab.textContent = headerAnchorParent.textContent;
      if (headerAnchorParent.tagName === 'H2') {
        verticalTab.classList.add('ds-tab--vertical');
        verticalTabs.push(verticalTab);
        console.log('verticaltab i verticaltabs', verticalTab, verticalTabs);
      } //else {
      //   verticalTab.classList.add('ds-tab__submenu--vertical');
      // }
      console.log('verrrtical tab', verticalTab, headerAnchorParent.tagName);
      //verticalTab.headerAnchorParent.document.createElement('div');
      // verticalTabs.push(verticalTab);
      verticalTabs[0].classList.add('active');
    }
  });

  //verticalTabsWrapper.appendChild()
  verticalTabs.forEach(tab => verticalTabsWrapper.appendChild(tab));

  currentVerticalTabLink = verticalTabs[0];

  console.log('verticalTabs it is', verticalTabs);

  verticalTabsAll.push(...verticalTabs);

  // const headerAnchorsParents = Array.of(headerAnchors).filter(anchor => anchor[1].parentElement);
  console.log('headerAnchors --2', headerAnchors, headerAnchorsParents, verticalTabs, verticalTabsWrapper);
  /*  /!*headerAnchors*!/ verticalTabs.forEach(tab => {
    console.log('tabbsbbbbb', tab);
    verticalObserver.observe(tab);
  });*/

  // verticalTabs.forEach(tab => {
  //   console.log('tabbsbbbbb', tab);
  //   verticalObserver.observe(tab);
  // });

  // verticalObserver.observe(verticalTabs);
  //});

  // TODO: observer not working?

  verticalTabsAll?.forEach(verticalTab => {
    verticalTab.onclick = (event: MouseEvent) => {
      console.log('verticalTab in sele event', event, /*verticalTabsAll, */ (event.target as HTMLAnchorElement)?.href);
      selectVerticalTab(event.target as Element);
    };
  });
}

const config = {
  root: null, //container, //null, //container, //null, //null, // Sets the framing element to the viewport
  //rootMargin: '104px', //'104px', //'112px', // TODO change for the desktop version on resize as well
  threshold: 1
};

const observer = new IntersectionObserver(
  entries =>
    entries.forEach(({ /*boundingClientRect, rootBounds,*/ target, intersectionRatio }) => {
      console.log('entry target', target, intersectionRatio);
      const tabsContainer = target.previousSibling as Element; //.querySelector('.ds-tabs__container');
      // console.log(
      //   'intersectionRatio',
      //   intersectionRatio,
      //   target,
      //   tabsContainer,
      //   entries,
      //   entries[0]?.boundingClientRect.bottom < entries[0].rootBounds?.bottom,
      //   entries[0]?.intersectionRect.bottom < entries[0].rootBounds?.bottom,
      //   entries[0]?.boundingClientRect.height < entries[0].rootBounds?.bottom,
      //   entries[0]?.boundingClientRect.bottom > entries[0].rootBounds?.bottom,
      //   boundingClientRect.bottom > rootBounds.bottom - 112 //142
      // );
      if (!tabsContainer) {
        return;
      }

      target.classList.toggle('ds-tabs__container--sticky', intersectionRatio < 1);
      //  { threshold: [1] }

      console.log('entry target tabsContainer', tabsContainer, tabsContainer.classList, target.classList);
      // if (rootBounds && intersectionRatio >= 1 && boundingClientRect.bottom > rootBounds.bottom + rootBounds.top) {
      //   //tabsContainer.classList.add('ds-tabs__container--sticky');
      //   target.classList.add('ds-tabs__container--sticky');
      // } else {
      //   // tabsContainer.classList.remove('ds-tabs__container--sticky');
      //   target.classList.remove('ds-tabs__container--sticky');
      // }
      console.log('tabsContainer2', tabsContainer, tabsContainer.classList);
    }),
  config
);

// TODO: generate vertical tabs

const verticalConfig = {
  root: null, //document.querySelector('.ds-tabs__tab-content-wrapper') //null, //container, //null, //container, //null, //null, // Sets the framing element to the viewport
  //rootMargin: '104px', //'104px', //'112px', // TODO change for the desktop version on resize as well
  //threshold: 1
  threshold: 0.5,
  rootMargin: '-200px 0px 0px 0px'
};
const verticalObserver = new IntersectionObserver(entries => {
  console.log('entries vertical', entries, verticalTabsContainers, verticalTabsAll);
  entries.forEach(entry => {
    const id = entry.target.id; //getAttribute('href');
    console.log(
      'entries vertical --- id',
      id,
      headerAnchors,
      headerAnchorsParentsAll,
      entry.intersectionRatio,
      id,
      entry
      // id ? verticalTabsContainers[0].querySelector(`[href="${id}"]`) : 'nothing'
    ); // TODO: use exact tabs container, not only first one, it's empty for now - fix this
    console.log(
      'entries vertical --- headerparents',
      headerAnchorsParentsAll,
      id,
      entry.target
      // id ? verticalTabsContainers[0].querySelector(`[href="${id}"]`) : 'nothing'
    );
    if (!id) {
      return;
    }

    // const verticalTabLink = verticalTabsContainers[0].querySelector(`[href="${id}"]`);
    const verticalTabLink = verticalTabsAll.find(element => (element as HTMLAnchorElement).hash === `#${id}`);
    //console.log('elem hash vert', (element as HTMLAnchorElement).hash, `#${id}`);
    console.log(
      'verticalTabLink',
      entry.boundingClientRect.y,
      tabsContentWrapper,
      tabsContainers,
      entry,
      entry.intersectionRatio,
      verticalTabLink,
      verticalTabsAll,
      entry.target,
      currentVerticalTabLink,
      entry.rootBounds,
      entry.rootBounds ? entry.intersectionRect.height > entry.rootBounds?.height : 'nothing happened'
    );
    if (!verticalTabLink) {
      return;
    }
    // currentVerticalTabLink?.classList.remove('active');
    if (
      entry.intersectionRatio > 0 &&
      entry.isIntersecting /*&&
      verticalTabLink !== currentVerticalTabLink &&
      entry.intersectionRect.top > 0 &&
      entry.boundingClientRect.y > 0*/
    ) {
      // verticalTabsAll.forEach(tab => tab.classList.remove('active'));
      // currentVerticalTabLink.classList.remove('active');

      //verticalTabLink.classList.add('active');
      selectVerticalTab(verticalTabLink);

      // currentVerticalTabLink = verticalTabLink;
    } /*else {
      verticalTabLink.classList.remove('active');
    }*/
    // currentVerticalTabLink = verticalTabLink;
    // alignVerticalTabIndicator(currentVerticalTabLink);
  });
}, verticalConfig);

// observer.observe(/*tabsHeaderContainer*/ tabsContainer as Element);

function setScrollable(): void {
  if (!tabsWrapper) {
    return;
  }

  const //tabsHeaderContainer, //wrapper = tabsHeaderContainer?.querySelector('.wrapper') as HTMLElement,
    { clientWidth, /*scrollLeft,*/ scrollWidth } = tabsWrapper,
    scrollable = scrollWidth > clientWidth;

  // console.log(
  //   'tabsHeaderContainer, clientWidth, scrollLeft, scrollWidth, scrollable',
  //   tabsHeaderContainer,
  //   clientWidth,
  //   scrollLeft,
  //   scrollWidth,
  //   scrollable,
  //   tabsHeaderContainer.getBoundingClientRect().width,
  //   tabsContainer?.clientWidth,
  //   tabsContainer?.getBoundingClientRect().width,
  //   tabsContainer?.clientWidth,
  //   tabsContainer?.scrollWidth,
  //   window.innerWidth,
  //   window.outerWidth,
  //   tabsContainer ? tabsContainer?.clientWidth < window.innerWidth : null,
  //   tabsWrapper.clientWidth,
  //   tabsWrapper.getBoundingClientRect().width,
  //   tabsWrapper.scrollWidth,
  //   tabsWrapper.getBoundingClientRect().width < tabsWrapper.scrollWidth
  // );

  tabsWrapper.classList.toggle('ds-tabs-wrapper--scrollable', scrollable);
}

function selectTab(tab: Element): void {
  console.log('event tab', tab);

  // observer.observe(/*tabsHeaderContainer*/ tabsContainer as Element);

  if (!tabs || !tabsContents) {
    return;
  }

  console.log(
    'start = button.offsetLeft - wrapper.offsetLeft;',
    (tab as HTMLElement).offsetLeft - (tabsContainer as HTMLElement)?.offsetLeft /*wrapper.offsetLeft*/
  );
  // TODO: prepare scrolling on select like #updateSelectionIndicator in tab bar
  const start = (tab as HTMLElement).offsetLeft - (tabsContainer as HTMLElement)?.offsetLeft - 24;

  setTimeout(() => {
    tabsWrapper.scrollTo({ left: start, behavior: 'smooth' });
  }, 100);

  current?.setAttribute('aria-selected', 'false');
  tab.setAttribute('aria-selected', 'true');
  const tabContent = Array.from(tabsContents).find(tabContent => {
    if (tabContent.getAttribute('aria-labelledby') === tab.getAttribute('id')) {
      return tabContent;
    }
  });
  currentContent?.classList.replace('ds-tabs__tab-content--active', 'ds-tabs__tab-content--hidden');
  tabContent?.classList.replace('ds-tabs__tab-content--hidden', 'ds-tabs__tab-content--active');
  for (let i = 0; i < tabs?.length; i++) {
    console.log('tabs width', tabsContainer?.clientWidth);
    //tabs[i].addEventListener('click', function () {
    if (!tabsWrapper || !current) {
      return;
    }

    // tabs.forEach(tab => tab.setAttribute('id', '1')); // TODO: unique id

    // const current = tabsWrapper.querySelectorAll('.active');
    current.className = current?.className.replace(' active', '');
    tab.className += ' active';

    // slider.style.transform = `translateX(calc{100% * (${i} - 1)})`;
    // console.log(
    //   'current[0].getBoundingClientRect().width',
    //   current[0].getBoundingClientRect().width,
    //   current[0].getBoundingClientRect().left,
    //   tabsWrapper.getBoundingClientRect().left,
    //   tabsWrapper.clientWidth,
    //   (tabsWrapper as HTMLDivElement).offsetWidth,
    //   (tabsWrapper as HTMLDivElement).scrollWidth,
    //   current[0].getBoundingClientRect().left - tabsWrapper.getBoundingClientRect().left
    // );
    // slider.style.left = `${current[0].getBoundingClientRect().left - tabsWrapper.getBoundingClientRect().left}px`; //`calc(calc(100% / 4) * ${i})`;
    // indicator.style.width = `${current[0].getBoundingClientRect().width}px`;

    alignTabIndicator(current);
    console.log('currenttt', current);
    current = tab;
    currentContent = tabContent as Element;

    console.log(
      '(tab as HTMLElement).offsetLeft - (tabsWrapper as HTMLElement).offsetLeft',
      (tab as HTMLElement).offsetLeft,
      (tab as HTMLElement).offsetLeft - (tabsWrapper as HTMLElement).offsetLeft,
      (tabsWrapper as HTMLElement).offsetLeft,
      (tab as HTMLElement).scrollLeft,
      (tabContent as HTMLElement).scrollLeft,
      (tabContent as HTMLElement).offsetLeft
    );
    // const tabOffset = (tab as HTMLElement).offsetLeft - (tabsWrapper as HTMLElement).offsetLeft;
    //tabsWrapper.scrollTo({ left: -(tab as HTMLElement).offsetLeft });
    // tabsWrapper.scrollTo({ left: (tabContent as HTMLElement).offsetLeft }); // TODO: show active tab
    //});
    observer?.disconnect();
    console.log('tabsContentWrapper w selectTab', tabsContentWrapper);
    console.log('what observes tabsContentWrapper', tabsContentWrapper, tabsHeaderContainer, tabsContainer);
    observer.observe(
      /*tabsHeaderContainer*/ /*tabsContainer as Element*/ /*tabsContentWrapper,*/ tabsContainer as Element
    );
    console.log(
      'observer.root, observer.rootMargin, observer.thresholds',
      observer.root,
      observer.rootMargin,
      observer.thresholds
    );

    // verticalObserver.disconnect();
    // headerAnchorsParentsAll.forEach(tab => {
    //   console.log('tabbsbbbbb', tab);
    //   if (tab) {
    //     verticalObserver.observe(tab);
    //   }
    // });
  }

  // const hasVerticalScrollbar = div.scrollHeight > div.clientHeight;
  headerAnchorsParentsAll.forEach(tab => {
    console.log('tabbsbbbbb', tab, tab?.parentElement, tab?.parentElement?.parentNode);
    const hasVerticalScrollbar =
      (tab?.parentElement?.parentNode as Element)?.scrollHeight >
      (tab?.parentElement?.parentNode as Element)?.clientHeight;
    console.log(
      'hasVerticalScrollbar',
      hasVerticalScrollbar,
      (tab?.parentElement?.parentNode as Element).getBoundingClientRect().height,
      (tab?.parentElement?.parentNode as Element)?.scrollHeight,
      (tab?.parentElement?.parentNode as Element)?.clientHeight,
      window.scrollY
    );
    if (tab) {
      // console.log('what observes tab.parentElement as Element', tab.parentElement as Element);
      verticalObserver.observe(tab.parentElement as Element);
    }
  });
}

function alignTabIndicator(tab: Element): void {
  if (!tabsWrapper) {
    return;
  }
  console.log('alignTabIndicator????');

  slider.style.left = `${tab.getBoundingClientRect().left - tabsWrapper.getBoundingClientRect().left}px`; //`calc(calc(100% / 4) * ${i})`;
  indicator.style.width = `${tab.getBoundingClientRect().width}px`;
  //slider.scrollTo({ left: tab.getBoundingClientRect().left - tabsWrapper.getBoundingClientRect().left });
  // slider.scrollTo({ left: tab.scrollLeft });
  console.log('tabsWrapper.scrollLeft', tabsWrapper.scrollLeft, tab.scrollLeft, tab.scrollWidth);
  // tabsWrapper.scrollTo({ left: -tabsWrapper.scrollLeft });
}

function selectVerticalTab(verticalTab: Element): void {
  /*const*/ currentVerticalTabsContainer = currentContent.querySelector('.ds-tabs[vertical]')?.firstChild as Element;
  console.log(
    'verticalTab in selectVerticalTab',
    currentVerticalTabsContainer,
    currentContent,
    verticalTab,
    currentVerticalTabLink,
    (verticalTab as HTMLAnchorElement).href,
    location.href
  );
  currentVerticalTabLink.className = currentVerticalTabLink?.className.replace(' active', '');
  verticalTab.classList.add('active');
  location.href = (verticalTab as HTMLAnchorElement).href;
  currentVerticalTabLink = verticalTab;
  // const currentVerticalTabsContainer = currentContent.querySelector('.ds-tabs[vertical]');
  alignVerticalTabIndicator(currentVerticalTabLink, currentVerticalTabsContainer);
}

// TODO: alignVerticalTabIndicator
function alignVerticalTabIndicator(tab: Element, currentVerticalTabsContainer: Element): void {
  // TODO: change everything for vertical
  const currentVerticalSliderElement = currentVerticalTabsContainer.querySelector('.vertical-slider') as HTMLElement;
  const currentVerticalIndicatorElement = currentVerticalTabsContainer.querySelector(
    '.vertical-indicator'
  ) as HTMLElement;

  if (!verticalTabsWrapperAll || !currentVerticalSliderElement || !currentVerticalIndicatorElement) {
    return;
  }

  console.log(
    'alignverticalTabIndicator????',
    verticalTabsWrapperAll,
    verticalSliderElement,
    currentVerticalTabsContainer,
    currentVerticalSliderElement,
    currentVerticalIndicatorElement
  );

  /*currentVerticalSliderElement.style.top = `${
    tab.getBoundingClientRect().top - currentVerticalTabsContainer.getBoundingClientRect().top
  }px`;*/ //`calc(calc(100% / 4) * ${i})`;
  currentVerticalIndicatorElement.style.top = `${
    tab.getBoundingClientRect().top - currentVerticalTabsContainer.getBoundingClientRect().top
  }px`;
  currentVerticalIndicatorElement.style.height = `${tab.getBoundingClientRect().height}px`;
  //slider.scrollTo({ left: tab.getBoundingClientRect().left - tabsWrapper.getBoundingClientRect().left });
  // slider.scrollTo({ left: tab.scrollLeft });
  console.log('tabsWrapper.scrollLeft', tabsWrapper.scrollLeft, tab.scrollLeft, tab.scrollWidth);
  // tabsWrapper.scrollTo({ left: -tabsWrapper.scrollLeft });
}

// for (let i = 0; i < tabs?.length; i++) {
//   if (!tabs) {
//     return;
//   }
//
//   tabs[i]?.addEventListener('click', function () {
//     if (!tabsContainer || !slider) {
//       return;
//     }
//
//     tabs?.forEach(tab => tab.setAttribute('id', '1')); // TODO: unique id
//
//     const current = tabsContainer.querySelectorAll('.active');
//     current[0].className = current[0]?.className.replace(' active', '');
//     this.className += ' active';
//
//     // slider.style.transform = `translateX(calc{100% * (${i} - 1)})`;
//     slider.style.left = `calc(calc(100% / 4) * ${i})`;
//   });
// }

// for (let i = 0; i < tabsPane.length; i++) {
//   tabsPane[i].addEventListener('click', function () {
//     tabHeader.getElementsByClassName('active')[0].classList.remove('active');
//     tabsPane[i].classList.add('active');
//     tabBody.getElementsByClassName('active')[0].classList.remove('active');
//     tabBody.getElementsByTagName('div')[i].classList.add('active');
//
//     tabIndicator.style.left = `calc(calc(100% / 4) * ${i})`;
//   });
// }

function onKeydown(event: KeyboardEvent): void {
  const keys = ['ArrowLeft', 'ArrowRight'];

  if (!keys.includes(event.key)) {
    return;
  }

  const focusedTab = getActiveElement(event.target as Node) as HTMLElement;

  let index: number = Array.from(tabs).indexOf(focusedTab);
  index += event.key === keys[0] ? -1 : 1;
  index = index % tabs.length;

  const nextTab = tabs[index];
  if (nextTab) {
    nextTab.focus();
  }
}

function onScroll(event: Event): void {
  console.log((event.target as HTMLElement).scrollLeft, slider.scrollLeft, current?.scrollLeft);
  // slider.style.left = `-${(event.target as HTMLElement).scrollLeft}px`;
  slider.scrollTo({ left: (event.target as HTMLElement).scrollLeft });
  // const sliderScrollLeft = (event.target as HTMLElement).scrollLeft;
  console.log((event.target as HTMLElement).scrollLeft, slider.scrollLeft);
  if (!current || !tabsWrapper) {
    return;
  }
  slider.style.left = `${current.getBoundingClientRect().left - tabsWrapper.getBoundingClientRect().left}px`; // - sliderScrollLeft
}
