import SettingItem from './SettingItem';
import './Settings.css';

function Settings(props) {
  const classes = ['Settings', props.isLightTheme ? 'light' : 'dark'];
  return (
    <div className={classes.join(' ')}>
      <div className='Settings-title'>SETTINGS</div>
      <SettingItem
        title='Color Theme'
        isOffLight={false}
        offText='Dark'
        onText='Light'
        value={props.isLightTheme}
        onChange={props.onIsLightThemeChange}
      />
      <SettingItem
        title='Coordinates'
        isOffLight={false}
        offText='Hide'
        onText='Show'
        value={props.isShowingCoords}
        onChange={props.onIsShowingCoordsChange}
      />
    </div>
  );
}

export default Settings;
