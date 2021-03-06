// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import React, { useEffect, useRef, useState } from 'react';
import { Spinner } from '@fluentui/react';
import { GroupCallLocator, TeamsMeetingLinkLocator } from '@azure/communication-calling';
import { CallAdapter, CallComposite, createAzureCommunicationCallAdapter } from '@azure/communication-react';
import { CommunicationUserIdentifier } from '@azure/communication-common';
// import { refreshTokenAsync } from '../utils/refreshToken';
import { useSwitchableFluentTheme } from '../theming/SwitchableFluentThemeProvider';
import { createAutoRefreshingCredential } from '../utils/credential';

export interface CallScreenProps {
  token: string;
  userId: CommunicationUserIdentifier;
  callLocator: GroupCallLocator | TeamsMeetingLinkLocator;
  displayName: string;
  onCallEnded: () => void;
  onCallError: (e: Error) => void;
}

export const CallScreen = (props: CallScreenProps): JSX.Element => {
  const { token, userId, callLocator, displayName, onCallEnded, onCallError } = props;
  const [adapter, setAdapter] = useState<CallAdapter>();
  const adapterRef = useRef<CallAdapter>();
  const { currentTheme } = useSwitchableFluentTheme();

  useEffect(() => {
    (async () => {

      const adapter = await createAzureCommunicationCallAdapter({
        userId: { kind: 'communicationUser', communicationUserId: userId.communicationUserId },
        displayName: displayName,
        credential: createAutoRefreshingCredential(userId.communicationUserId, token),
        locator: callLocator
      });
      adapter.on('callEnded', () => {
        onCallEnded();
      });
      adapter.on('error', (e) => {
        console.error(e);
        onCallError(e);
      });
      setAdapter(adapter);
      adapterRef.current = adapter;
    })();

    return () => {
      adapterRef?.current?.dispose();
    };
  }, [callLocator, displayName, token, userId, onCallEnded, onCallError]);

  if (!adapter) {
    return <Spinner label={'Loading...'} ariaLive="assertive" labelPosition="top" />;
  }
  
  const options = { mobileView: true, callControls: {
    compressedMode: false, screenShareButton: false
  }}

  return <CallComposite adapter={adapter} fluentTheme={currentTheme.theme} callInvitationURL={window.location.href} options={options} />;
};
