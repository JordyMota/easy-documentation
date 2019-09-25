function handleSelectDocument(docItem) {
	const docItems = document.querySelectorAll('[data-documentation-item]');
	docItems.forEach((item)=> {
		item.classList.remove('active--js');
	});
	docItem.classList.add('active--js');
	const currentRef = docItem.getAttribute('data-documentation-item');
	handlChangeContent(currentRef);
	genereateDocSubItems(currentRef);
}

function cleanReplace(text) {
	return text.replace(/replaceStringRightHere/g,'')
}

function verifyAnchor(anchor) {
	return anchor ? ('id="'+anchor+'"') : '';
}

function handlChangeContent(dataRef) {
	const pageData = pagesContent[dataRef];
	let pageContent = '';
	pageData.content.forEach((item)=> {
		pageContent += renderDocPageItem(item);
	});
	const pageContentContainer = document.getElementById('page-content');
	pageContentContainer.innerHTML = pageContent;
	document.querySelectorAll('pre code').forEach((block) => {
		hljs.highlightBlock(block);
	});
	pageContentContainer.innerHTML = cleanReplace(pageContentContainer.innerHTML);
	document.querySelectorAll('[data-anchor]').forEach((item)=> {
		item.onclick = ({target})=> {
			setTimeout(()=> {
				scrollToPoint(target.getAttribute('data-anchor'));
			},0);
		}
	});
}

function renderDocPageItem(item) {
	let pageContent = '<div class="col-10">';
	switch(item.type) {
		case 'descript':
			if (item.title)
				pageContent += `<h2 ${ verifyAnchor(item.dataAnchor) }>${ item.title }</h2>`;
			if (item.content)
				pageContent += `<p class="app-content__content-descript">${ item.content }</p>`;
		break;
		case 'code':
			if (item.title)
				pageContent += `<h2 ${ verifyAnchor(item.dataAnchor) }>${ item.title }</h2>`;
			if (item.content)
				pageContent += `<pre><code class="app-content__content-descript javascript">${ item.content }</code></pre>`;
		break;
		case 'img':
			if (item.title)
				pageContent += `<h3 ${ verifyAnchor(item.dataAnchor) }>${ item.title }</h3>`;
			if (item.content)
				pageContent += `<img class="app-content__content-descript" src="${item.content}" />`;
		break;
		default:
			if (item.title && !item.content)
				pageContent += `<h1 class="app-content__title" ${ verifyAnchor(item.dataAnchor) }>${ item.title }</h1>`;
			if (item.title && item.content)
				pageContent += `<h2 ${ verifyAnchor(item.dataAnchor) }>${ item.title }</h2>`;
			if (item.content)
				pageContent += `<p class="app-content__content-descript">${ item.content }</p>`;
	}
	pageContent += '</div>';
	return pageContent;
}

function setDocumentItemsActions() {
	const docItems = document.querySelectorAll('[data-documentation-item]');
	docItems.forEach((item)=> {
		item.onclick = ({ target })=> {
			handleSelectDocument(target);
		}
	});
}

function scrollToPoint(id) {
    const scrollElement = document.querySelector(id);
    const headerHeight = parseFloat(window.getComputedStyle(document.querySelector('header')).height);
    document.querySelector('#page-content').scrollTop = (scrollElement.offsetTop - (headerHeight+80));
}

function genereateDocItems() {
	let docItems = '';
	Object.entries(pagesContent).forEach(([key,value])=> {
		docItems += `
			<li
				class="document-list-item col-12 flex"
			>
				<a
					data-documentation-item="${key}"
					class="document-list-item__anchor flex-full flex align-center ${ !value.active ? '' : 'active--js' }"
				>
					${ value.title }
				</a>
			</li>
		`;
	});
	document.getElementById('page-doc-list').innerHTML = docItems;
}

function genereateDocSubItems(ref) {
	// .split(' ').slice(0,2).join(' ')
	const oldSubList = document.querySelector('[currentSubList]');
	if (oldSubList)
		oldSubList.outerHTML = '';
	let docItems = '<ul class="column-direction col-12 row" currentSubList>';
	pagesContent[ref].content.filter(item => { return !(!item.dataAnchor) }).forEach( item => {
		docItems += `
			<li
				class="document-list-item document-list-item--sub-item col-11 offset-1 flex"
			>
				<a
					onclick="scrollToPoint('#${item.dataAnchor}')"
					class="document-list-item__anchor document-list-item__anchor--sub-item flex-full flex align-center"
				>
					${ item.title }
				</a>
			</li>
		`;
	});
	docItems += '</ul>';
	const newItem = document.createElement('newSubList');
	const lastItem = document.querySelector(`[data-documentation-item="${ref}"]`).parentElement;
	const docList = document.getElementById('page-doc-list');
	if (lastItem.nextElementSibling) {
		docList.insertBefore(newItem,lastItem.nextElementSibling);
	} else {
		docList.appendChild(newItem);
	}
	docList.querySelector('newSubList').outerHTML = docItems;
}

document.addEventListener('DOMContentLoaded', (event) => {
	genereateDocItems();
	setDocumentItemsActions();
	const activeDocItem = document.querySelector('[data-documentation-item].active--js');
	if (activeDocItem) {
		const activeRef = activeDocItem.getAttribute('data-documentation-item');
		handlChangeContent(activeRef);
		genereateDocSubItems(activeRef);
	}
});
