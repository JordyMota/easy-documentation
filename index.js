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
	pageData.content.forEach( item => {
		pageContent += renderDocPageItem(item);
	});
	const pageContentContainer = document.getElementById('page-content');
	pageContentContainer.innerHTML = pageContent;
	document.querySelectorAll('pre code').forEach( item => {
		hljs.highlightBlock(item);
	});
	pageContentContainer.innerHTML = cleanReplace(pageContentContainer.innerHTML);
	pageContentContainer.scrollTop = 0;
	document.querySelectorAll('[data-anchor]').forEach( item => {
		item.onclick = ({target})=> {
			setTimeout(()=> {
				scrollToPoint(target.getAttribute('data-anchor'));
			},0);
		}
	});

	document.querySelectorAll('pre code').forEach( item => {
		const svgCopy = document.createElement('copySvg');
		item.appendChild(svgCopy);
		document.querySelector('copySvg').outerHTML = renderSvgCopy();
		item.querySelector('.copy-svg').onclick = ({target}) => {
			copyCode(target.parentElement.textContent.trim());
		}
	});
}

function renderSvgCopy() {
	return `
		<svg viewBox="0 0 488.3 488.3" width="13vw" height="13vw" class="copy-svg">
			<g>
				<g>
					<path d="M314.25,85.4h-227c-21.3,0-38.6,17.3-38.6,38.6v325.7c0,21.3,17.3,38.6,38.6,38.6h227c21.3,0,38.6-17.3,38.6-38.6V124 C352.75,102.7,335.45,85.4,314.25,85.4z M325.75,449.6c0,6.4-5.2,11.6-11.6,11.6h-227c-6.4,0-11.6-5.2-11.6-11.6V124 c0-6.4,5.2-11.6,11.6-11.6h227c6.4,0,11.6,5.2,11.6,11.6V449.6z"/>
					<path d="M401.05,0h-227c-21.3,0-38.6,17.3-38.6,38.6c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5c0-6.4,5.2-11.6,11.6-11.6h227 c6.4,0,11.6,5.2,11.6,11.6v325.7c0,6.4-5.2,11.6-11.6,11.6c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5c21.3,0,38.6-17.3,38.6-38.6 V38.6C439.65,17.3,422.35,0,401.05,0z"/>
				</g>
			</g>
		</svg>
	`;
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
	docItems.forEach( item => {
		item.onclick = ({ target })=> {
			handleSelectDocument(target);
		}
	});
}

function scrollToPoint(id) {
    const scrollElement = document.querySelector(id);
    if (!scrollElement)
		return;
	const oldElement = document.querySelector('active-anchor--js');
	if (oldElement) {
		oldElement.classList.remove('active-anchor--js','default-transition');
	}
    scrollElement.classList.add('default-transition');
    scrollElement.classList.add('active-anchor--js');
    setTimeout(()=> {
    	scrollElement.classList.remove('active-anchor--js');
    	setTimeout(()=> {
    		scrollElement.classList.remove('default-transition');
    	},400);
    },1000);
    const headerHeight = parseFloat(window.getComputedStyle(document.querySelector('header')).height);
    document.querySelector('#page-content').scrollTop = (scrollElement.offsetTop - (headerHeight+80));
}

function copyCode(text='') {
	if (!text)
		return;
	let textArea = document.createElement('textarea');
	textArea.setAttribute('id','input-copy-text');
	textArea.setAttribute('style','position: fixed; pointer-events: none; touch-action: none; opacity: 0; z-index: -1;');
	document.body.appendChild(textArea);
	textArea = document.getElementById('input-copy-text');
	textArea.value = removeComents(text);
	textArea.select();
	textArea.setSelectionRange(0, 99999);
	document.execCommand("copy");
	textArea.outerHTML = '';
	presentToast('Código copiado para a área de transferência!');
}

function removeComents(text='') {
	if (!text)
		return;
	let newText = text;
	let hasComent = true;
	while(hasComent) {
		const comentStart = newText.indexOf('/*');
		const comentEnd = newText.indexOf('*/');
		if (comentStart < 0 || comentEnd < 0)
			hasComent = false;
		else {
			let firstText = newText.slice(0,comentStart);
			let lastText = newText.slice((comentEnd+2),(newText.length));
			newText = firstText+lastText;
		}
	}
	return newText;
}

var toastTimeout = null;
function presentToast(text='') {
	if (!text)
		return;
	clearTimeout(toastTimeout);
	let toast = document.querySelector('.current-toast');
	if (toast)
		toast.outerHTML = '';
	toast = document.createElement('div');
	toast.setAttribute('class','current-toast toast-default fadeIn');
	document.body.appendChild(toast);
	toast = document.querySelector('.current-toast');
	toast.innerHTML = text;
	toastTimeout = setTimeout(()=> {
		if (toast) {
			toast.classList.remove('fadeIn');
			toast.classList.add('fadeOut');
			setTimeout(()=> {
				toast.outerHTML = '';
			},600)
		}
	},1820);
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
