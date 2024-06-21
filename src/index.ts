import View from "@/view/view";

const root: HTMLElement | null = document.getElementById('root');

if (!root) {
    throw new Error('Root element not found');
}

View.renderHeader();
View.userView();
View.endView();
