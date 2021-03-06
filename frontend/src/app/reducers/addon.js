import { handleActions } from 'redux-actions';

const setHasAddon = (state, { payload: hasAddon }) => ({ ...state, hasAddon });

const setInstalled = (state, { payload: { installed, installedLoaded } }) =>
  ({ ...state, installed, installedLoaded });

const setClientUuid = (state, { payload: clientUUID }) => ({ ...state, clientUUID });

const enableExperiment = (state, { payload: experiment }) => {
  const newInstalled = { ...state.installed };
  newInstalled[experiment.addon_id] = experiment;
  return { ...state, installed: newInstalled };
};

const disableExperiment = (state, { payload: experiment }) => {
  const newInstalled = { ...state.installed };
  delete newInstalled[experiment.addon_id];
  return { ...state, installed: newInstalled };
};

const requireRestart = (state, { payload: experimentTitle }) => {
  return {
    ...state,
    restart: {
      isRequired: true,
      forExperiment: experimentTitle || null
    }
  };
};

export const getInstalled = (state) => state.installed;

export const isExperimentEnabled = (state, experiment) =>
  !!(experiment && experiment.addon_id in state.installed);

export const isInstalledLoaded = (state) => state.installedLoaded;

export default handleActions({
  setHasAddon,
  setInstalled,
  setClientUuid,
  enableExperiment,
  disableExperiment,
  requireRestart
}, {
  hasAddon: false,
  installed: {},
  installedLoaded: false,
  clientUUID: '',
  restart: {
    isRequired: false,
    forExperiment: null
  }
});
