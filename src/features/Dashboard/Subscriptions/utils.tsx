import { isObjEmpty } from "common/utils/generalUtils";
import { groupedIdMap } from "./topicIdMap";
import { IGroupedOccurences, ITopicInfo } from "./types";

interface IPieChartData {
  name: string;
  value: number;
}

export const convertToPieChartData = (
  occurences: IGroupedOccurences
): IPieChartData[] => {
  const convertedData: IPieChartData[] = [];
  for (const [groupTopicName, topicOccurences] of Object.entries(occurences)) {
    if (!isObjEmpty(topicOccurences)) {
      convertedData.push({
        name: groupTopicName,
        value: Object.values(topicOccurences).reduce(
          (total, count) => total + count,
          0
        ),
      });
    }
  }

  return convertedData;
};

export const convertToTopicData = (
  occurences: IGroupedOccurences,
  type: "most" | "least"
): ITopicInfo => {
  const topicInfo: ITopicInfo = {
    categoryName: "",
    percentage: "",
    topicName: "",
  };
  // If occurences is an empty object
  if (isObjEmpty(occurences)) {
    return topicInfo;
  }

  // If we are looking for the least popular category and there are categories missing
  if (type === "least") {
    const missingCategory = Object.keys(occurences).find((categoryName) =>
      isObjEmpty(occurences[categoryName])
    );

    if (missingCategory !== undefined) {
      topicInfo.categoryName = missingCategory;
      topicInfo.percentage = "0%";
      // Grab first topic under missing category
      topicInfo.topicName = Object.values(
        groupedIdMap[missingCategory as keyof typeof groupedIdMap]
      )[0];
      return topicInfo;
    }
  }

  let categoryCount = 0;
  let totalCount = 0;

  const categoryName = Object.keys(occurences).reduce((a, b) => {
    // count of previous category with highest count
    const aCount = Object.values(occurences[a]).reduce(
      (total, count) => total + count,
      0
    );
    // count of current category count
    const bCount = Object.values(occurences[b]).reduce(
      (total, count) => total + count,
      0
    );

    // Only add aCount if first iteration
    if (totalCount === 0) {
      totalCount += aCount;
    }
    totalCount += bCount;

    if (
      (aCount > bCount && type === "most") ||
      (aCount < bCount && type === "least")
    ) {
      categoryCount = aCount;
      return a;
    } else {
      categoryCount = bCount;
      return b;
    }
  });

  const percentage = `${((categoryCount * 100) / totalCount).toFixed()}%`;

  const topicName = Object.keys(occurences[categoryName]).reduce((a, b) => {
    return occurences[categoryName][a] > occurences[categoryName][b] ? a : b;
  });

  return {
    categoryName: categoryName,
    percentage: percentage,
    topicName: topicName,
  };
};
