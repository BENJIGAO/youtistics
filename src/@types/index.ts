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

export interface Thumbnail {
  /** (Optional) Height of the thumbnail image. */
  height?: number;
  /** The thumbnail image's URL. */
  url?: string;
  /** (Optional) Width of the thumbnail image. */
  width?: number;
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
