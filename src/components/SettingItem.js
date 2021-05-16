import './SettingItem.css';

function SettingItem(props) {
  const offClasses = [
    'SettingItem-option',
    props.isOffLight ? 'light' : 'dark',
    props.value ? 'inactive' : 'active',
  ];
  const onClasses = [
    'SettingItem-option',
    props.isOffLight ? 'dark' : 'light',
    props.value ? 'active' : 'inactive',
  ];
  return (
    <div className='SettingItem'>
      <div style={{ display: 'table', width: '100%', height: '100%' }}>
        <div className='SettingItem-title'>{props.title}</div>
        <div
          className={offClasses.join(' ')}
          onClick={() => props.onChange(!props.value)}
        >
          {props.offText}
        </div>
        <div
          className={onClasses.join(' ')}
          onClick={() => props.onChange(!props.value)}
        >
          {props.onText}
        </div>
      </div>
    </div>
  );
}

export default SettingItem;
