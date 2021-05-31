import { CallComposite, CallAdapter, createAzureCommunicationCallAdapter } from '@azure/communication-react';
import { Theme, PartialTheme } from '@fluentui/react-theme-provider';
import React, { useState, useEffect } from 'react';
import { utils } from './Utils/Utils';
import { CommunicationUserToken } from '@azure/communication-identity';

export type ContainerProps = {
  token?: string;
  locator?: string;
  displayName?: string;
  fluentTheme?: PartialTheme | Theme;
};

const isTeamsMeetingLink = (link: string): boolean => link.startsWith('https://teams.microsoft.com/l/meetup-join');

export const CallContainer = (props: ContainerProps): JSX.Element => {
  const [adapter, setAdapter] = useState<CallAdapter>();

  useEffect(() => {
    (async () => {

      const tokenResponse: CommunicationUserToken = await utils.getTokenForUser();
      const userToken = tokenResponse.token;
    //   const userId = tokenResponse.user.communicationUserId;

      console.log(tokenResponse)

      const callLocator = { groupId: "6375c0ae-49a3-4af0-9a91-679129d5ea4e" }
      const displayName = "Test 2"

      // if (props.token && props.locator && props.displayName) {
        // const callLocator = isTeamsMeetingLink(props.locator)
        //   ? { meetingLink: props.locator }
        //   : { groupId: props.locator };
        const createAdapter = async (): Promise<void> => {
          setAdapter(await createAzureCommunicationCallAdapter(userToken, callLocator, displayName));
        };
        createAdapter();
      // }
    })();
  }, [props]);

  useEffect(() => {
    return () => {
      (async () => {
        if (!adapter) {
          return;
        }
        await adapter.leaveCall().catch((e) => {
          console.error('Failed to leave call', e);
        });
        adapter.dispose();
      })();
    };
  }, [adapter]);

  return <>{adapter && <CallComposite adapter={adapter} fluentTheme={props.fluentTheme} />}</>;
};