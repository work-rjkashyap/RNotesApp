import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {Note} from '../types/note';
import {
  Calendar,
  Tag as TagIcon,
  ArrowRight,
  FileText,
  Clock4,
  Hash,
  Edit2,
} from 'lucide-react-native';
import Animated from 'react-native-reanimated';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({note, onPress}) => {
  const {theme, isDark} = useTheme();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const getRandomTagColor = (tag: string) => {
    const colors = [
      {bg: '#FFE4E4', text: '#FF4A4A'},
      {bg: '#E4F4FF', text: '#0095FF'},
      {bg: '#E4FFE4', text: '#00B341'},
      {bg: '#FFE4FF', text: '#B300B3'},
      {bg: '#FFF4E4', text: '#FF9500'},
    ];
    const index = tag.length % colors.length;
    return isDark
      ? {bg: colors[index].text + '20', text: colors[index].text}
      : colors[index];
  };

  const truncateText = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.substring(0, length).trim() + '...';
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: isDark ? theme.surface : theme.card,
          borderColor: theme.secondary + '10',
        },
      ]}
      activeOpacity={0.7}
      onPress={onPress}>
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <View style={styles.dateContainer}>
            <Clock4 size={14} color={theme.secondary} strokeWidth={1.5} />
            <Text style={[styles.dateText, {color: theme.secondary}]}>
              {formatDate(note.updatedAt)}
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <Edit2 size={14} color={theme.primary} strokeWidth={1.5} />
          </View>
        </View>

        <Text style={[styles.title, {color: theme.text}]} numberOfLines={2}>
          {note.title}
        </Text>

        <Text
          style={[styles.preview, {color: theme.secondary}]}
          numberOfLines={2}>
          {truncateText(note.content, 120)}
        </Text>

        {note.tags && note.tags.length > 0 && (
          <View style={styles.tagContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.tagScroll}>
              {note.tags.map((tag, index) => {
                const tagColor = getRandomTagColor(tag);
                return (
                  <View
                    key={tag}
                    style={[styles.tag, {backgroundColor: tagColor.bg}]}>
                    <Text style={[styles.tagText, {color: tagColor.text}]}>
                      {tag}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}

        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <View
              style={[
                styles.statsItem,
                {backgroundColor: theme.primary + '10'},
              ]}>
              <FileText size={12} color={theme.primary} strokeWidth={1.5} />
              <Text style={[styles.statsText, {color: theme.primary}]}>
                {note.content.length} chars
              </Text>
            </View>
          </View>
          <ArrowRight size={16} color={theme.primary} strokeWidth={2} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
  },
  cardContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  dateText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
    lineHeight: 24,
  },
  preview: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    marginBottom: 16,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  tagScroll: {
    flexGrow: 0,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  statsText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
});

export default NoteCard;
