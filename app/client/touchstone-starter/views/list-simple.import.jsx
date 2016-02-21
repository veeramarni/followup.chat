import { Link, UI } from '{followupchat:app-deps}/packages/touchstonejs';

export default React.createClass({

    statics: {
        // referring to the navigationBar component that was used as placeholder in app.import.jsx
        navigationBar: 'main',
        // NavigationBar component takes following configurations. Check NavigationBar component
        getNavigation(props, app) {
            return {
                title: 'Simple List',
                leftLabel: 'Lists',
                leftArrow: true,
                leftAction: () => { app.transitionTo('tabs:lists', {transition: 'reveal-from-right'})}
            }
        }
    },
    render() {
        return(
            <div>List Simple</div>

        )
    }
})