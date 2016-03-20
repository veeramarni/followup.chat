import { UI} from 'touchstonejs';


export default React.createClass({
    displayName: 'NotifyPopup',

    propTypes: {
        visible: React.PropTypes.bool.isRequired,
        className: React.PropTypes.string,
        type: React.PropTypes.oneOf(['alert', 'confirm', 'prompt']),
        okText: React.PropTypes.string,
        okType: React.PropTypes.string,
        cancelText: React.PropTypes.string,
        cancelType: React.PropTypes.string,
        title: React.PropTypes.string,
        subTitle: React.PropTypes.string,
        template: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func,
        //prompt
        inputType: React.PropTypes.string,
        defaultText: React.PropTypes.string,
        maxLength: React.PropTypes.number,
        inputPlaceholder: React.PropTypes.string
    },

    renderButtons(btns){
        return (
            <div className="popup-buttons">
                {btns.map(function (btn, i) {
                    return <UI.Button key={btn+i} onTap={btn.onTap} className={btn.className} type={btn.type}>{btn.text}</UI.Button>
                })}
            </div>
        )
    },
    onTap (isSuccess, callback) {
            this.props.onChange();
    },
    getOptions () {
        let opts = {
            loading: false,
            template: this.props.template,
            iconType: 'danger',
            iconName: 'ion-sad-outline',
            title: this.props.title,
            subTitle: this.props.subTitle
        };
        if (this.props.type === 'alert') {
            return Object.assign({
                buttons: [{text: this.props.okText || 'OK', type: this.props.okType || 'primary', className:'left-btn', onTap: this.onTap.bind(this, true)},
                    {text: this.props.cancelText || 'Cancel', type:this.props.cancelType || 'default',  className:'right-btn', onTap: this.onTap.bind(this, false)}]
            }, opts)
        }
        else if (this.prop.type === 'confirm') {
            return Object.assign({
                buttons: [{text: this.props.okText || 'Ok', type: this.props.okType || 'button-positive', onTap: this.onTap.bind(this, true)}]
            }, opts)
        }
        else if (this.prop.type === 'prompt') {
            return {}
        }
    },

    render() {

        let opts = this.getOptions();

        return (
            <UI.Popup className="notify popup-wrapper" visible={this.props.visible}>
                <div className="popup-head">
                    {opts.title && <h3 className="popup-title">{opts.title}</h3>}
                    {opts.subTitle && <h5 className="popup-sub-title">{opts.subTitle}</h5>}
                </div>
                <div className="popup-body">
                    {opts.template}
                </div>
                {this.renderButtons(opts.buttons)}
            </UI.Popup>
        )
    }


})