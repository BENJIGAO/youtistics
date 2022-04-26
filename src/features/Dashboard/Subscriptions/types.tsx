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
