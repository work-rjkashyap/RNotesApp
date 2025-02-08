import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {useTheme} from '../context/ThemeContext';
import {Note} from '../types/note';
import {Clock, Tag, ChevronRight, Bookmark} from 'lucide-react-native';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({note, onPress}) => {
  const {theme, isDark} = useTheme();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: isDark ? theme.surface : theme.card,
          borderColor: theme.secondary + '50',
        },
      ]}
      activeOpacity={0.7}
      onPress={onPress}>
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View
              style={[
                styles.categoryBadge,
                {backgroundColor: theme.primary + '15'},
              ]}>
              <Bookmark size={14} color={theme.primary} strokeWidth={1.5} />
              <Text style={[styles.categoryText, {color: theme.primary}]}>
                {note.tags?.[0] || 'Note'}
              </Text>
            </View>
            <View style={styles.dateWrapper}>
              <Clock size={12} color={theme.secondary} strokeWidth={1.5} />
              <Text style={[styles.dateText, {color: theme.secondary}]}>
                {formatDate(note.updatedAt)}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.priorityIndicator,
              {backgroundColor: theme.primary + '20'},
            ]}
          />
        </View>

        <Text style={[styles.title, {color: theme.text}]} numberOfLines={1}>
          {note.title}
        </Text>

        <Text
          style={[styles.preview, {color: theme.secondary}]}
          numberOfLines={2}>
          {note.content}
        </Text>

        <View style={styles.footer}>
          <View style={styles.tags}>
            {note.tags?.slice(0, 2).map((tag, index) => (
              <View
                key={tag}
                style={[styles.tag, {backgroundColor: theme.primary + '10'}]}>
                <Tag size={12} color={theme.primary} strokeWidth={1.5} />
                <Text style={[styles.tagText, {color: theme.primary}]}>
                  {tag}
                </Text>
              </View>
            ))}
            {(note.tags?.length || 0) > 2 && (
              <Text style={[styles.moreText, {color: theme.secondary}]}>
                +{note.tags!.length - 2} more
              </Text>
            )}
          </View>
          <ChevronRight size={16} color={theme.secondary} strokeWidth={1.5} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 6,
    marginBottom: 12,
    borderWidth: 1,
  },
  cardContent: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
  },
  priorityIndicator: {
    width: 24,
    height: 3,
    borderRadius: 1.5,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 6,
  },
  preview: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    lineHeight: 18,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  tagText: {
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
  },
  moreText: {
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
  },
});

export default NoteCard;
