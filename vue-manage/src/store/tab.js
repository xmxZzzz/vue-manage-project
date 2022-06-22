export default {
    state: {
        isCollapse: false,
        // 面包屑数据
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home',
            }
        ],
        currentMenu: null
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        selectMenu(state, val) {
            if (val.name !== 'home') {
                state.currentMenu = val;
                const result = state.tabsList.findIndex(item => item.name === val.name);
                if (result === -1) {
                    state.tabsList.push(val);
                }
            } else {
                state.currentMenu = null;
            }
        },
        closeTag(state, val) {
            const res = state.tabsList.findIndex(item => item.name === val.name);
            if (res !== -1) {
                state.tabsList.splice(res, 1);
            }
        }
    }
}