// Copyright (c) 2023 Joseph Hale <me@jhale.dev>
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0.

import React from 'react';
import {Button, List, Text, useTheme} from 'react-native-paper';
import {ScrollView, StyleSheet, View} from 'react-native';
import formatElapsedTime, {
  getAttemptTimeString,
} from '../../utils/formatElapsedTime';

import {Attempt} from '../../../lib/stif/wrappers';
import Icons from '../../icons/iconHelper';
import TwistyPlayer from '../TwistyPlayer';
import {useTranslation} from 'react-i18next';
import ZaidSurface from '../zaid/ZaidSurface';

export interface AttemptDetailsProps {
  attempt: Attempt;
  onReplay?: (attempt: Attempt) => void;
  onInspectTPS?: (attempt: Attempt) => void;
  onInspectMoveCount?: (attempt: Attempt) => void;
  onDelete?: (attempt: Attempt) => void;
}

export default function AttemptDetails({
  attempt,
  onReplay = () => {},
  onInspectTPS = undefined,
  onInspectMoveCount = undefined,
  onDelete = undefined,
}: AttemptDetailsProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}>
      <HeaderSection attempt={attempt} onReplay={onReplay} />
      <CommentSection comment={attempt.comment()} />
      <StatisticsSection
        attempt={attempt}
        onInspectTPS={onInspectTPS}
        onInspectMoveCount={onInspectMoveCount}
      />
      <InfractionsSection attempt={attempt} />
      <SolutionsSection attempt={attempt} />
      <ActionsSection attempt={attempt} onDelete={onDelete} />
    </ScrollView>
  );
}

function SectionShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ZaidSurface
      style={styles.sectionShell}
      material="clear"
      cornerRadius={26}
      refractionHeight={56}
      bevelWidth={10}
      dispersionStrength={0.10}>
      {children}
    </ZaidSurface>
  );
}

interface SectionProps {
  attempt: Attempt;
}

interface HeaderSectionProps extends SectionProps {
  onReplay: (attempt: Attempt) => void;
}

function HeaderSection({attempt, onReplay}: HeaderSectionProps) {
  const theme = useTheme();
  const {t} = useTranslation();

  return (
    <ZaidSurface
      style={styles.headerCard}
      material="regular"
      cornerRadius={30}
      refractionHeight={68}
      bevelWidth={14}
      dispersionStrength={0.13}>
      <Text
        variant="displayMedium"
        numberOfLines={1}
        adjustsFontSizeToFit
        style={styles.headerTime}>
        {getAttemptTimeString(attempt)}
      </Text>

      <View style={styles.headerSubtitle}>
        {Icons.STIF(`event-${attempt.event().id}`)({
          size: 16,
          color: theme.colors.onBackground,
        })}
        <Text variant="bodyMedium">
          {t(`events.${attempt.event().id}`)}
        </Text>
      </View>

      {attempt.moveCount() > 0 ? (
        <Button
          onPress={() => onReplay(attempt)}
          style={styles.replayButton}
          mode="outlined"
          icon={Icons.Entypo('controller-play')}>
          {t('attempt.replay')}
        </Button>
      ) : null}
    </ZaidSurface>
  );
}

function CommentSection({comment}: {comment: string}) {
  const {t} = useTranslation();

  return comment.length > 0 ? (
    <SectionShell>
      <List.Section style={styles.listSection}>
        <List.Subheader>{t('attempt.comment')}</List.Subheader>
        <List.Item
          title={comment}
          titleNumberOfLines={0}
          left={props => (
            <List.Icon
              color={props.color}
              style={[props.style, {alignSelf: 'flex-start'}]}
              icon={Icons.MaterialIcons('comment')}
            />
          )}
        />
      </List.Section>
    </SectionShell>
  ) : null;
}

interface StatisticsSectionProps extends AttemptDetailsProps {
  onInspectTPS?: (attempt: Attempt) => void;
  onInspectMoveCount?: (attempt: Attempt) => void;
}

function StatisticsSection({
  attempt,
  onInspectTPS,
  onInspectMoveCount,
}: StatisticsSectionProps) {
  const {t} = useTranslation();

  return (
    <SectionShell>
      <List.Section style={styles.listSection}>
        <List.Subheader>{t('statistics.statistics')}</List.Subheader>
        <List.Item
          left={props => (
            <List.Icon {...props} icon={Icons.Ionicons('hourglass')} />
          )}
          title={formatElapsedTime(attempt.inspectionDuration())}
          description={t('statistics.duration.inspection')}
        />
        <List.Item
          left={props => (
            <List.Icon
              {...props}
              icon={Icons.MaterialCommunityIcons('counter')}
            />
          )}
          title={attempt.moveCount() || t('common.not_available')}
          description={t('statistics.move_count')}
          onPress={
            attempt.moveCount() && onInspectMoveCount
              ? () => onInspectMoveCount(attempt)
              : undefined
          }
          right={props =>
            attempt.moveCount() && onInspectMoveCount ? (
              <List.Icon {...props} icon={Icons.Entypo('chevron-right')} />
            ) : null
          }
        />
        <List.Item
          left={props => (
            <List.Icon
              {...props}
              icon={Icons.MaterialCommunityIcons('speedometer')}
            />
          )}
          title={attempt.tps()?.toFixed(3) ?? t('common.not_available')}
          description={t('statistics.tps')}
          onPress={
            attempt.tps() && onInspectTPS
              ? () => onInspectTPS(attempt)
              : undefined
          }
          right={props =>
            attempt.tps() && onInspectTPS ? (
              <List.Icon {...props} icon={Icons.Entypo('chevron-right')} />
            ) : null
          }
        />
      </List.Section>
    </SectionShell>
  );
}

function InfractionsSection({attempt}: SectionProps) {
  const {t} = useTranslation();

  return (
    <SectionShell>
      <List.Section style={styles.listSection}>
        <List.Subheader>
          {t('attempt.infraction', {count: attempt.infractions().length})}
        </List.Subheader>
        {attempt.infractions().length === 0 ? (
          <List.Item title={t('common.none')} />
        ) : (
          attempt.infractions().map((infraction, index) => (
            <List.Item
              key={index}
              left={props => (
                <List.Icon {...props} icon={Icons.Entypo('flag')} />
              )}
              title={infraction.penalty}
              description={infraction.id}
              titleNumberOfLines={0}
            />
          ))
        )}
      </List.Section>
    </SectionShell>
  );
}

function SolutionsSection({attempt}: SectionProps) {
  const {t} = useTranslation();
  const theme = useTheme();

  return (
    <SectionShell>
      <List.Section style={styles.listSection}>
        <List.Subheader>
          {t('puzzle.puzzle', {count: attempt.solutions().length})}
        </List.Subheader>
        {/* @ts-ignore */}
        {attempt.solutions().map((solution, index) => (
          <List.Accordion
            key={index}
            title={solution.scramble().join(' ')}
            titleNumberOfLines={0}
            description={
              solution.duration() ? formatElapsedTime(solution.duration()) : ''
            }
            style={styles.accordion}
            left={props => (
              <List.Icon {...props} icon={Icons.STIF(`event-${solution.puzzle()}`)} />
            )}>
            <View style={styles.player}>
              <TwistyPlayer
                // @ts-ignore
                puzzle={solution.puzzle()}
                algorithm={solution.scramble()}
                visualization={'2D'}
                backgroundColor={theme.colors.background}
              />
            </View>
          </List.Accordion>
        ))}
      </List.Section>
    </SectionShell>
  );
}

interface ActionsProps extends SectionProps {
  onDelete?: (attempt: Attempt) => void;
}

function ActionsSection({attempt, onDelete}: ActionsProps) {
  const {t} = useTranslation();
  const theme = useTheme();

  return onDelete ? (
    <SectionShell>
      <List.Section style={styles.listSection}>
        <List.Subheader>{t('attempt.actions')}</List.Subheader>
        <List.Item
          left={props => (
            <List.Icon {...props} icon={Icons.FontAwesome('trash')} />
          )}
          title={t('attempt.delete')}
          description={t('attempt.delete_description')}
          descriptionStyle={{color: theme.colors.error}}
          onPress={() => onDelete(attempt)}
        />
      </List.Section>
    </SectionShell>
  ) : null;
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 28,
    gap: 12,
  },

  headerCard: {
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 16,
    borderRadius: 30,
  },

  headerTime: {
    maxWidth: '100%',
    fontWeight: '800',
    letterSpacing: -1.4,
  },

  headerSubtitle: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginTop: 4,
    opacity: 0.76,
  },

  replayButton: {
    marginTop: 14,
  },

  sectionShell: {
    borderRadius: 26,
    overflow: 'hidden',
  },

  listSection: {
    marginVertical: 0,
  },

  accordion: {
    backgroundColor: 'transparent',
  },

  player: {
    height: 200,
    overflow: 'hidden',
  },
});
