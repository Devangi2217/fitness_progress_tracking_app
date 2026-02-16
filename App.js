import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('onboarding');

  const ScreenComponent = useMemo(() => {
    switch (activeScreen) {
      case 'goals':
        return GoalSetupScreen;
      case 'upload':
        return ProgressUploadScreen;
      case 'community':
        return CommunityFeedScreen;
      case 'onboarding':
      default:
        return OnboardingScreen;
    }
  }, [activeScreen]);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text style={styles.headerEyebrow}>Fitness Progress</Text>
            <Text style={styles.headerTitle}>Tracking App</Text>
            <Text style={styles.headerSubtitle}>
              Connect, track, and improve with a focused training workflow.
            </Text>
          </View>
        </SafeAreaView>
        <View style={styles.content}>
          <ScreenComponent />
        </View>
        <SafeAreaView style={styles.navWrap}>
          <View style={styles.nav}>
            {[
              { key: 'onboarding', label: 'Onboarding' },
              { key: 'goals', label: 'Goals' },
              { key: 'upload', label: 'Progress' },
              { key: 'community', label: 'Community' },
            ].map((item) => (
              <TouchableOpacity
                key={item.key}
                onPress={() => setActiveScreen(item.key)}
                style={[
                  styles.navButton,
                  activeScreen === item.key && styles.navButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.navText,
                    activeScreen === item.key && styles.navTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

function OnboardingScreen() {
  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.heroCard}>
        <Text style={screenStyles.heroTitle}>Train with intent.</Text>
        <Text style={screenStyles.heroCopy}>
          Build habits, track lifts, and share progress with people who share
          your goals. Every session adds momentum.
        </Text>
      </View>
      <View style={screenStyles.infoGrid}>
        {[
          {
            title: 'Goal-Based Matching',
            copy:
              'Find training partners based on strength, hypertrophy, or conditioning goals.',
          },
          {
            title: 'Progress Visuals',
            copy:
              'Track lifts, volume, and PRs with clear visuals that keep you on track.',
          },
          {
            title: 'Weekly Focus',
            copy:
              'Plan sessions and review weekly progress so your training stays consistent.',
          },
        ].map((item) => (
          <View key={item.title} style={screenStyles.infoCard}>
            <Text style={screenStyles.infoTitle}>{item.title}</Text>
            <Text style={screenStyles.infoCopy}>{item.copy}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function GoalSetupScreen() {
  const goalTags = ['Strength', 'Hypertrophy', 'Endurance', 'Mobility'];
  const weeklyTargets = [
    { label: 'Workouts / week', value: '4' },
    { label: 'Sleep target', value: '7.5 hrs' },
    { label: 'Protein target', value: '140 g' },
  ];

  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.card}>
        <Text style={screenStyles.title}>Set your training focus</Text>
        <Text style={screenStyles.copy}>
          Pick a primary goal so the app can personalize your plan, metrics, and
          community matches.
        </Text>
        <View style={screenStyles.tagRow}>
          {goalTags.map((tag) => (
            <View key={tag} style={screenStyles.tag}>
              <Text style={screenStyles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={screenStyles.card}>
        <Text style={screenStyles.title}>Weekly targets</Text>
        <View style={screenStyles.targetGrid}>
          {weeklyTargets.map((item) => (
            <View key={item.label} style={screenStyles.targetCard}>
              <Text style={screenStyles.targetValue}>{item.value}</Text>
              <Text style={screenStyles.targetLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function ProgressUploadScreen() {
  const recentUploads = [
    { title: 'Bench Press - 185 lb', note: 'PR set · Video' },
    { title: 'Deadlift - 275 lb', note: 'Form check · Video' },
    { title: 'Squat - 205 lb', note: 'Depth review · Image' },
  ];

  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.card}>
        <Text style={screenStyles.title}>Upload a lift</Text>
        <Text style={screenStyles.copy}>
          Add a video or image to track form and celebrate new personal records.
        </Text>
        <View style={screenStyles.uploadPanel}>
          <Text style={screenStyles.uploadTitle}>Drag or tap to upload</Text>
          <Text style={screenStyles.uploadCopy}>MP4, MOV, JPG supported</Text>
        </View>
      </View>

      <View style={screenStyles.card}>
        <Text style={screenStyles.title}>Recent progress</Text>
        <View style={screenStyles.list}>
          {recentUploads.map((item) => (
            <View key={item.title} style={screenStyles.listItem}>
              <View style={screenStyles.listBadge} />
              <View style={screenStyles.listContent}>
                <Text style={screenStyles.listTitle}>{item.title}</Text>
                <Text style={screenStyles.listNote}>{item.note}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function CommunityFeedScreen() {
  const feed = [
    {
      name: 'Priya K.',
      goal: 'Strength',
      update: 'Hit a 225 lb bench press today. New personal best!',
      time: '2h ago',
    },
    {
      name: 'Jordan M.',
      goal: 'Hypertrophy',
      update: 'Logged a new 5x5 squat session. Feeling strong.',
      time: '6h ago',
    },
    {
      name: 'Sam R.',
      goal: 'Endurance',
      update: 'Added 3 new mobility drills to recovery routine.',
      time: '1d ago',
    },
  ];

  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.card}>
        <Text style={screenStyles.title}>Community feed</Text>
        <Text style={screenStyles.copy}>
          Follow athletes with similar goals and stay motivated with shared
          progress updates.
        </Text>
      </View>
      <View style={screenStyles.feed}>
        {feed.map((item) => (
          <View key={item.name} style={screenStyles.feedCard}>
            <View style={screenStyles.feedHeader}>
              <View>
                <Text style={screenStyles.feedName}>{item.name}</Text>
                <Text style={screenStyles.feedGoal}>{item.goal} focus</Text>
              </View>
              <Text style={screenStyles.feedTime}>{item.time}</Text>
            </View>
            <Text style={screenStyles.feedUpdate}>{item.update}</Text>
            <View style={screenStyles.feedActions}>
              <Text style={screenStyles.feedAction}>Encourage</Text>
              <Text style={screenStyles.feedAction}>Save</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  safeArea: {
    backgroundColor: '#0b0d1f',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#0b0d1f',
  },
  headerEyebrow: {
    color: '#7dd3fc',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 12,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#f8fafc',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 6,
  },
  headerSubtitle: {
    color: '#cbd5f5',
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
  },
  content: {
    flex: 1,
  },
  navWrap: {
    backgroundColor: '#0b0d1f',
  },
  nav: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    backgroundColor: '#0b0d1f',
  },
  navButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
    alignItems: 'center',
  },
  navButtonActive: {
    backgroundColor: '#38bdf8',
    borderColor: 'transparent',
  },
  navText: {
    color: '#cbd5f5',
    fontSize: 12,
    fontWeight: '600',
  },
  navTextActive: {
    color: '#0b0d1f',
  },
});

const screenStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
    gap: 16,
  },
  heroCard: {
    backgroundColor: '#111827',
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  heroTitle: {
    color: '#f8fafc',
    fontSize: 22,
    fontWeight: '700',
  },
  heroCopy: {
    color: '#cbd5f5',
    marginTop: 8,
    lineHeight: 20,
  },
  infoGrid: {
    gap: 12,
  },
  infoCard: {
    backgroundColor: '#0b1220',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.12)',
  },
  infoTitle: {
    color: '#e2e8f0',
    fontWeight: '600',
    marginBottom: 6,
  },
  infoCopy: {
    color: '#94a3b8',
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  title: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
  },
  copy: {
    color: '#cbd5f5',
    marginTop: 8,
    lineHeight: 20,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  tag: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#1f2937',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  tagText: {
    color: '#e2e8f0',
    fontSize: 12,
    fontWeight: '600',
  },
  targetGrid: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  targetCard: {
    flex: 1,
    backgroundColor: '#0b1220',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.12)',
  },
  targetValue: {
    color: '#38bdf8',
    fontWeight: '700',
    fontSize: 18,
  },
  targetLabel: {
    color: '#94a3b8',
    marginTop: 6,
    fontSize: 12,
  },
  uploadPanel: {
    marginTop: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(148, 163, 184, 0.4)',
    paddingVertical: 22,
    alignItems: 'center',
    backgroundColor: '#0b1220',
  },
  uploadTitle: {
    color: '#38bdf8',
    fontWeight: '700',
  },
  uploadCopy: {
    color: '#94a3b8',
    marginTop: 6,
    fontSize: 12,
  },
  list: {
    marginTop: 12,
    gap: 12,
  },
  listItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  listBadge: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: '#38bdf8',
  },
  listContent: {
    flex: 1,
  },
  listTitle: {
    color: '#e2e8f0',
    fontWeight: '600',
  },
  listNote: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  feed: {
    gap: 12,
  },
  feedCard: {
    backgroundColor: '#0b1220',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.12)',
  },
  feedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  feedName: {
    color: '#e2e8f0',
    fontWeight: '700',
  },
  feedGoal: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  feedTime: {
    color: '#94a3b8',
    fontSize: 12,
  },
  feedUpdate: {
    color: '#cbd5f5',
    marginTop: 10,
    lineHeight: 20,
  },
  feedActions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
  },
  feedAction: {
    color: '#38bdf8',
    fontWeight: '600',
    fontSize: 12,
  },
});
