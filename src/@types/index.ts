/**
 * Personal Types
 */

export interface ITopicInfo {
  categoryName: string;
  percentage: string;
  topicName: string;
}
export interface ITopicOccurences {
  // key = Topic id
  // value = Occurence of topic
  [key: string]: number;
}
export interface IGroupedOccurences {
  // key = General category name (e.g., Gaming)
  // value = Object containing topic occurences that fall under the general category
  [key: string]: ITopicOccurences;
}

/**
 * Subscription
 */

export interface Subscription {
  /** The contentDetails object contains basic statistics about the subscription. */
  contentDetails?: SubscriptionContentDetails;
  /** Etag of this resource. */
  etag?: string;
  /** The ID that YouTube uses to uniquely identify the subscription. */
  id?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#subscription". */
  kind?: string;
  /** The snippet object contains basic details about the subscription, including its title and the channel that the user subscribed to. */
  snippet?: SubscriptionSnippet;
  /** The subscriberSnippet object contains basic details about the subscriber. */
  subscriberSnippet?: SubscriptionSubscriberSnippet;
}
export interface SubscriptionContentDetails {
  /** The type of activity this subscription is for (only uploads, everything). */
  activityType?: string;
  /** The number of new items in the subscription since its content was last read. */
  newItemCount?: number;
  /** The approximate number of items that the subscription points to. */
  totalItemCount?: number;
}
export interface SubscriptionSnippet {
  /** The ID that YouTube uses to uniquely identify the subscriber's channel. */
  channelId?: string;
  /** Channel title for the channel that the subscription belongs to. */
  channelTitle?: string;
  /** The subscription's details. */
  description?: string;
  /** The date and time that the subscription was created. */
  publishedAt?: string;
  /** The id object contains information about the channel that the user subscribed to. */
  resourceId?: ResourceId;
  /**
   * A map of thumbnail images associated with the video. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other
   * information about the thumbnail.
   */
  thumbnails?: ThumbnailDetails;
  /** The subscription's title. */
  title?: string;
}
export interface SubscriptionSubscriberSnippet {
  /** The channel ID of the subscriber. */
  channelId?: string;
  /** The description of the subscriber. */
  description?: string;
  /** Thumbnails for this subscriber. */
  thumbnails?: ThumbnailDetails;
  /** The title of the subscriber. */
  title?: string;
}
export interface Thumbnail {
  /** (Optional) Height of the thumbnail image. */
  height?: number;
  /** The thumbnail image's URL. */
  url?: string;
  /** (Optional) Width of the thumbnail image. */
  width?: number;
}

/**
 * Channel
 */

// omitted some properties for brevity
export interface Channel {
  /** Etag of this resource. */
  etag?: string;
  /** The ID that YouTube uses to uniquely identify the channel. */
  id?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#channel". */
  kind?: string;
  /** The snippet object contains basic details about the channel, such as its title, description, and thumbnail images. */
  snippet?: ChannelSnippet;
  /** The statistics object encapsulates statistics for the channel. */
  statistics?: ChannelStatistics;
  /** The status object encapsulates information about the privacy status of the channel. */
  status?: ChannelStatus;
  /** The topicDetails object encapsulates information about Freebase topics associated with the channel. */
  topicDetails?: ChannelTopicDetails;
}
export interface ChannelSnippet {
  /** The country of the channel. */
  country?: string;
  /** The custom url of the channel. */
  customUrl?: string;
  /** The language of the channel's default title and description. */
  defaultLanguage?: string;
  /** The description of the channel. */
  description?: string;
  /** Localized title and description, read-only. */
  localized?: ChannelLocalization;
  /** The date and time that the channel was created. */
  publishedAt?: string;
  /**
   * A map of thumbnail images associated with the channel. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other
   * information about the thumbnail. When displaying thumbnails in your application, make sure that your code uses the image URLs exactly as they are returned in API responses. For
   * example, your application should not use the http domain instead of the https domain in a URL returned in an API response. Beginning in July 2018, channel thumbnail URLs will only
   * be available in the https domain, which is how the URLs appear in API responses. After that time, you might see broken images in your application if it tries to load YouTube images
   * from the http domain. Thumbnail images might be empty for newly created channels and might take up to one day to populate.
   */
  thumbnails?: ThumbnailDetails;
  /** The channel's title. */
  title?: string;
}
export interface ChannelLocalization {
  /** The localized strings for channel's description. */
  description?: string;
  /** The localized strings for channel's title. */
  title?: string;
}
export interface ChannelStatistics {
  /** The number of comments for the channel. */
  commentCount?: string;
  /** Whether or not the number of subscribers is shown for this user. */
  hiddenSubscriberCount?: boolean;
  /** The number of subscribers that the channel has. */
  subscriberCount?: string;
  /** The number of videos uploaded to the channel. */
  videoCount?: string;
  /** The number of times the channel has been viewed. */
  viewCount?: string;
}
export interface ChannelStatus {
  /** If true, then the user is linked to either a YouTube username or G+ account. Otherwise, the user doesn't have a public YouTube identity. */
  isLinked?: boolean;
  /** The long uploads status of this channel. See https://support.google.com/youtube/answer/71673 for more information. */
  longUploadsStatus?: string;
  madeForKids?: boolean;
  /** Privacy status of the channel. */
  privacyStatus?: string;
  selfDeclaredMadeForKids?: boolean;
}
export interface ChannelTopicDetails {
  /** A list of Wikipedia URLs that describe the channel's content. */
  topicCategories?: string[];
  /** A list of Freebase topic IDs associated with the channel. You can retrieve information about each topic using the Freebase Topic API. */
  topicIds?: string[];
}

/**
 * Video
 */

export interface Video {
  /** The contentDetails object contains information about the video content, including the length of the video and its aspect ratio. */
  contentDetails?: VideoContentDetails;
  /** Etag of this resource. */
  etag?: string;
  /** The ID that YouTube uses to uniquely identify the video. */
  id?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#video". */
  kind?: string;
  /** The snippet object contains basic details about the video, such as its title, description, and category. */
  snippet?: VideoSnippet;
  /** The statistics object contains statistics about the video. */
  statistics?: VideoStatistics;
  /** The statistics object contains statistics about the video. */
  /** The topicDetails object encapsulates information about Freebase topics associated with the video. */
  topicDetails?: VideoTopicDetails;
}
export interface VideoContentDetails {
  /** The value of captions indicates whether the video has captions or not. */
  caption?: string;
  /** The value of definition indicates whether the video is available in high definition or only in standard definition. */
  definition?: string;
  /** The value of dimension indicates whether the video is available in 3D or in 2D. */
  dimension?: string;
  /**
   * The length of the video. The tag value is an ISO 8601 duration in the format PT#M#S, in which the letters PT indicate that the value specifies a period of time, and the letters M
   * and S refer to length in minutes and seconds, respectively. The # characters preceding the M and S letters are both integers that specify the number of minutes (or seconds) of the
   * video. For example, a value of PT15M51S indicates that the video is 15 minutes and 51 seconds long.
   */
  duration?: string;
  /** Indicates whether the video uploader has provided a custom thumbnail image for the video. This property is only visible to the video uploader. */
  hasCustomThumbnail?: boolean;
  /** The value of is_license_content indicates whether the video is licensed content. */
  licensedContent?: boolean;
  /** Specifies the projection format of the video. */
  projection?: string;
}
export interface VideoStatistics {
  /** The number of comments for the video. */
  commentCount?: string;
  /** The number of users who have indicated that they disliked the video by giving it a negative rating. */
  dislikeCount?: string;
  /** The number of users who currently have the video marked as a favorite video. */
  favoriteCount?: string;
  /** The number of users who have indicated that they liked the video by giving it a positive rating. */
  likeCount?: string;
  /** The number of times the video has been viewed. */
  viewCount?: string;
}
export interface VideoSnippet {
  /** The YouTube video category associated with the video. */
  categoryId?: string;
  /** The ID that YouTube uses to uniquely identify the channel that the video was uploaded to. */
  channelId?: string;
  /** Channel title for the channel that the video belongs to. */
  channelTitle?: string;
  /** The default_audio_language property specifies the language spoken in the video's default audio track. */
  defaultAudioLanguage?: string;
  /** The language of the videos's default snippet. */
  defaultLanguage?: string;
  /** The video's description. @mutable youtube.videos.insert youtube.videos.update */
  description?: string;
  /** Indicates if the video is an upcoming/active live broadcast. Or it's "none" if the video is not an upcoming/active live broadcast. */
  liveBroadcastContent?: string;
  /** The date and time when the video was uploaded. */
  publishedAt?: string;
  /** A list of keyword tags associated with the video. Tags may contain spaces. */
  tags?: string[];
  /**
   * A map of thumbnail images associated with the video. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other
   * information about the thumbnail.
   */
  thumbnails?: ThumbnailDetails;
  /** The video's title. @mutable youtube.videos.insert youtube.videos.update */
  title?: string;
}
export interface VideoTopicDetails {
  /**
   * Similar to topic_id, except that these topics are merely relevant to the video. These are topics that may be mentioned in, or appear in the video. You can retrieve information about
   * each topic using Freebase Topic API.
   */
  relevantTopicIds?: string[];
  /** A list of Wikipedia URLs that provide a high-level description of the video's content. */
  topicCategories?: string[];
  /**
   * A list of Freebase topic IDs that are centrally associated with the video. These are topics that are centrally featured in the video, and it can be said that the video is mainly
   * about each of these. You can retrieve information about each topic using the < a href="http://wiki.freebase.com/wiki/Topic_API">Freebase Topic API.
   */
  topicIds?: string[];
}

/**
 * PlaylistItem
 */

export interface PlaylistItem {
  /** The contentDetails object is included in the resource if the included item is a YouTube video. The object contains additional information about the video. */
  contentDetails?: PlaylistItemContentDetails;
  /** Etag of this resource. */
  etag?: string;
  /** The ID that YouTube uses to uniquely identify the playlist item. */
  id?: string;
  /** Identifies what kind of resource this is. Value: the fixed string "youtube#playlistItem". */
  kind?: string;
  /** The snippet object contains basic details about the playlist item, such as its title and position in the playlist. */
  snippet?: PlaylistItemSnippet;
  /** The status object contains information about the playlist item's privacy status. */
  status?: PlaylistItemStatus;
}
export interface PlaylistItemContentDetails {
  /**
   * The time, measured in seconds from the start of the video, when the video should stop playing. (The playlist owner can specify the times when the video should start and stop playing
   * when the video is played in the context of the playlist.) By default, assume that the video.endTime is the end of the video.
   */
  endAt?: string;
  /** A user-generated note for this item. */
  note?: string;
  /**
   * The time, measured in seconds from the start of the video, when the video should start playing. (The playlist owner can specify the times when the video should start and stop
   * playing when the video is played in the context of the playlist.) The default value is 0.
   */
  startAt?: string;
  /** The ID that YouTube uses to uniquely identify a video. To retrieve the video resource, set the id query parameter to this value in your API request. */
  videoId?: string;
  /** The date and time that the video was published to YouTube. */
  videoPublishedAt?: string;
}
export interface PlaylistItemSnippet {
  /** The ID that YouTube uses to uniquely identify the user that added the item to the playlist. */
  channelId?: string;
  /** Channel title for the channel that the playlist item belongs to. */
  channelTitle?: string;
  /** The item's description. */
  description?: string;
  /** The ID that YouTube uses to uniquely identify thGe playlist that the playlist item is in. */
  playlistId?: string;
  /** The order in which the item appears in the playlist. The value uses a zero-based index, so the first item has a position of 0, the second item has a position of 1, and so forth. */
  position?: number;
  /** The date and time that the item was added to the playlist. */
  publishedAt?: string;
  /** The id object contains information that can be used to uniquely identify the resource that is included in the playlist as the playlist item. */
  resourceId?: ResourceId;
  /**
   * A map of thumbnail images associated with the playlist item. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other
   * information about the thumbnail.
   */
  thumbnails?: ThumbnailDetails;
  /** The item's title. */
  title?: string;
  /** Channel id for the channel this video belongs to. */
  videoOwnerChannelId?: string;
  /** Channel title for the channel this video belongs to. */
  videoOwnerChannelTitle?: string;
}
export interface PlaylistItemStatus {
  /** This resource's privacy status. */
  privacyStatus?: string;
}

/**
 * General
 */

export interface ThumbnailDetails {
  /** The default image for this resource. */
  default?: Thumbnail;
  /** The high quality image for this resource. */
  high?: Thumbnail;
  /** The maximum resolution quality image for this resource. */
  maxres?: Thumbnail;
  /** The medium quality image for this resource. */
  medium?: Thumbnail;
  /** The standard quality image for this resource. */
  standard?: Thumbnail;
}
export interface ResourceId {
  /** The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the resourceId.kind value is youtube#channel. */
  channelId?: string;
  /** The type of the API resource. */
  kind?: string;
  /** The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the resourceId.kind value is youtube#playlist. */
  playlistId?: string;
  /** The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the resourceId.kind value is youtube#video. */
  videoId?: string;
}
