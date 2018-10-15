import React from 'react';
import {
  Tab,
  Tabs,
  Button,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  TextField,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  CardActions
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import _ from 'lodash';

const TabContainer = props => <div>{props.children}</div>;

class GeneralSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabIndex: 0 };
  }

  handleTabChange = (event, tabIndex) => {
    this.setState({ tabIndex: tabIndex });
  };

  render() {
    return (
      <div>
        <Tabs value={this.state.tabIndex} onChange={this.handleTabChange}>
          <Tab label="General" />
          <Tab label="Datasource" />
        </Tabs>
        {this.state.tabIndex === 1 && (
          <TabContainer>
            <FormControl>
              <Select
                value={this.props.settings.datasource}
                onChange={event =>
                  this.props.onSettingsChange('datasource', event.target.value)
                }
              >
                <MenuItem value="url">Plain URL</MenuItem>
                <MenuItem value="python">Python</MenuItem>
              </Select>
            </FormControl>
          </TabContainer>
        )}
        {this.state.tabIndex === 0 && (
          <TabContainer>
            <TextField
              id="title"
              label="Title"
              value={this.props.settings.title}
              onChange={event =>
                this.props.onSettingsChange('title', event.target.value)
              }
              margin="normal"
            />
          </TabContainer>
        )}
      </div>
    );
  }
}
GeneralSettings.defaultProps = {
  settings: {
    title: 'default title',
    datasource: 'python'
  },
  onSettingsChange: (name, value) => console.log('Settings change', name, value)
};

const withSettingsDialog = SettingsComponent =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { settings: _.cloneDeep(this.props.initSettings) };
    }

    handleEntering = () => {
      //     this.radioGroupRef.focus();
      this.lastState = _.cloneDeep(this.state);
    };

    handleCancel = () => {
      // this.props.onClose(this.props.value);
      this.props.onDialogClosed();
      this.setState(this.lastState);
    };

    handleOk = () => {
      this.props.onDialogClosed();
      this.props.onSaveSettings(this.state.settings);
    };

    handleSettingsChange = (name, value) =>
      this.setState({
        settings: _.assign(this.state.settings, { [name]: value })
      });

    render() {
      return (
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth="xs"
          onEntering={this.handleEntering}
          aria-labelledby="settings-dialog-title"
          open={this.props.isDialogOpen}
        >
          <DialogTitle id="settings-dialog-title">Settings</DialogTitle>
          <DialogContent>
            <SettingsComponent
              {...this.props}
              settings={this.state.settings}
              onSettingsChange={this.handleSettingsChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleOk} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
  };

const withWidget = (WidgetComponent, SettingsComponent) =>
  class extends React.Component {
    constructor(props) {
      super(constructor);
      this.state = {
        isSettingDialogOpen: false,
        settings: SettingsComponent.defaultProps.settings
      };
    }

    SettingsDialog = withSettingsDialog(SettingsComponent);

    render() {
      const { title, ...otherSettings } = this.state.settings;
      return (
        <Card>
          {this.props.isEditable && SettingsComponent ? (
            <div>
              <this.SettingsDialog
                initSettings={this.state.settings}
                isDialogOpen={this.state.isSettingDialogOpen}
                onDialogClosed={() =>
                  this.setState({ isSettingDialogOpen: false })
                }
                onSaveSettings={settings =>
                  this.setState({ settings: settings })
                }
              />
            </div>
          ) : null}

          {this.props.isEditable ? (
            <CardActions>
              <IconButton
                aria-label="Edit Widget"
                onClick={event => this.setState({ isSettingDialogOpen: true })}
              >
                <EditIcon />
              </IconButton>
              <IconButton aria-label="Remove Widget">
                <CloseIcon />
              </IconButton>
            </CardActions>
          ) : null}

          <CardHeader title={title} component="div" />

          <CardContent>
            <WidgetComponent {...this.props} {...otherSettings} />
          </CardContent>
        </Card>
      );
    }
  };

export { GeneralSettings, withSettingsDialog, withWidget };
