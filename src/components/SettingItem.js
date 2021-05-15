import { Component } from 'react';
import './SettingItem.css';

class SettingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
    this.title = props.title;
    this.isOffLight = !!props.isOffLight;
    this.offText = props.offText;
    this.onText = props.onText;
    this.onChange = props.onChange;
  }

  // componentDidUpdate() {
  //   this.setState((_state, props) => ({ value: props.value }));
  // }

  render() {
    const { value } = this.props;
    const offClasses = [
      'SettingItem-option',
      this.isOffLight ? 'light' : 'dark',
      value ? 'inactive' : 'active',
    ];
    const onClasses = [
      'SettingItem-option',
      this.isOffLight ? 'dark' : 'light',
      value ? 'active' : 'inactive',
    ];
    return (
      <div className='SettingItem'>
        <div style={{ display: 'table', width: '100%', height: '100%' }}>
          <div className='SettingItem-title'>{this.title}</div>
          <div
            className={offClasses.join(' ')}
            onClick={() => this.onChange(!value)}
          >
            {this.offText}
          </div>
          <div
            className={onClasses.join(' ')}
            onClick={() => this.onChange(!value)}
          >
            {this.onText}
          </div>
        </div>
      </div>
    );
  }
}

export default SettingItem;
