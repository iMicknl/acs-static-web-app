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

// const isTeamsMeetingLink = (link: string): boolean => link.startsWith('https://teams.microsoft.com/l/meetup-join');

export const CallContainer = (props: ContainerProps): JSX.Element => {
  const [adapter, setAdapter] = useState<CallAdapter>();

  useEffect(() => {
    (async () => {

      const tokenResponse: CommunicationUserToken = await utils.getTokenForUser();
      const userToken = tokenResponse.token;
    //   const userId = tokenResponse.user.communicationUserId;

      console.log(tokenResponse)

      // const callLocator = { groupId: "6375c0ae-49a3-4af0-9a91-679129d5ea4e" }
      // const callLocator = { meetingLink: "https://teams.microsoft.com/l/meetup-join/19%3ameeting_NGQ0NTU1NTMtYWYwZS00M2IyLWI2OGUtZTA5NGYxMzU3NjVm%40thread.v2/0?context=%7b%22Tid%22%3a%2272f988bf-86f1-41af-91ab-2d7cd011db47%22%2c%22Oid%22%3a%22d9affa68-a5e7-4aef-93da-cbd52d8b8c81%22%7d" }

      const callLocator = { meetingLink: "https://teams.microsoft.com/l/meetup-join/19%3afd4c213af09148e796263ddc7880f749%40thread.skype/1598860556862?context=%7b%22Tid%22%3a%2272f988bf-86f1-41af-91ab-2d7cd011db47%22%2c%22Oid%22%3a%22ac57f220-792a-450d-bf61-5555f4112bd9%22%7d" }
      const displayName = "Bezoeker via ACS"

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