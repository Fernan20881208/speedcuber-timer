// Copyright (c) 2022 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {Appbar, Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';

import EventSelectorModal from '../components/events/EventSelectorModal';
import Icons from '../icons/iconHelper';
import {PracticeStackHeaderProps} from './types';
import PuzzleRegistry from '../components/smartpuzzles/SmartPuzzleRegistry';
import {STIF} from '../../lib/stif';
import SmartPuzzleScannerModal from '../components/smartpuzzles/SmartPuzzleScannerModal';
import {useCompetitiveEvent} from '../hooks/useCompetitiveEvent';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAppearance} from '../../features/appearance/AppearanceContext';
import ZaidSurface from '../components/zaid/ZaidSurface';

export default function AppBar({navigation, back}: PracticeStackHeaderProps) {
  const [event, setEvent] = useCompetitiveEvent();
  const [showEventSelector, setShowEventSelector] = useState(false);
  const [showPuzzleScanner, setShowPuzzleScanner] = useState(false);
  const smartPuzzle = PuzzleRegistry.lastConnectedPuzzle();
  const {t} = useTranslation();
  const {mode} = useAppearance();
  const useGlass = mode === 'liquidGlass';

  const eventButton = (
    <Button
      icon={Icons.STIF(`event-${event.id}`)}
      mode={useGlass ? 'text' : 'contained-tonal'}
      compact
      contentStyle={styles.eventButtonContent}
      onPress={() => setShowEventSelector(true)}>
      {t(`events.${event.id}`)}
    </Button>
  );

  const header = (
    <Appbar.Header
      mode="center-aligned"
      elevated={!useGlass}
      style={useGlass ? styles.transparentHeader : undefined}>
      {back ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : (
        <Appbar.Action icon="menu" onPress={navigation.toggleDrawer} />
      )}

      <Appbar.Content
        title={
          useGlass ? (
            <ZaidSurface
              style={styles.eventGlass}
              material="clear"
              cornerRadius={18}
              refractionHeight={42}
              bevelWidth={9}
              dispersionStrength={0.11}>
              {eventButton}
            </ZaidSurface>
          ) : (
            eventButton
          )
        }
      />

      <Appbar.Action
        icon={smartPuzzle ? 'bluetooth-connect' : 'bluetooth'}
        onPress={() => setShowPuzzleScanner(true)}
      />
    </Appbar.Header>
  );

  return (
    <>
      {useGlass ? (
        <ZaidSurface
          style={styles.headerGlass}
          material="regular"
          cornerRadius={0}
          refractionHeight={50}
          bevelWidth={0}
          dispersionStrength={0.09}>
          {header}
        </ZaidSurface>
      ) : (
        header
      )}

      <EventSelectorModal
        visible={showEventSelector}
        onDismiss={() => setShowEventSelector(false)}
        onSelect={(selectedEvent: STIF.CompetitiveEvent) => {
          setEvent(selectedEvent);
          setShowEventSelector(false);
        }}
      />

      <SmartPuzzleScannerModal
        visible={showPuzzleScanner}
        onDismiss={() => setShowPuzzleScanner(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerGlass: {
    width: '100%',
    borderRadius: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },

  transparentHeader: {
    backgroundColor: 'transparent',
  },

  eventGlass: {
    alignSelf: 'center',
    borderRadius: 18,
  },

  eventButtonContent: {
    minHeight: 38,
    paddingHorizontal: 4,
  },
});
