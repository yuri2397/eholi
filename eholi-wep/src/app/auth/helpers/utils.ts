export class Utils{
    static printContentHtml(content: any, fileName = '') {
        let newIframe = document.createElement('iframe');
        newIframe.width = '0';
        newIframe.height = '0';
        newIframe.src = 'about:blank';
        document.body.appendChild(newIframe)
        // @ts-ignore
        newIframe.contentWindow.contents = content;
        newIframe.src = 'javascript:window["contents"]';
        newIframe.focus();
        setTimeout(function() {
            newIframe.contentWindow.print();
        }, 1);
    }
}