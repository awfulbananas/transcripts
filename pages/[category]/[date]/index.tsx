import { formatISO, parseISO, intlFormat } from 'date-fns';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link'
import { ReactNode } from 'react';
import { VideoData, getAllCategories, getAllVideosForPublishDate, getDatesForCategory } from '../../../utilities/metadata-utils';
import { parseDateFromPath, formatDateForPath, getVideoPath } from '../../../utilities/path-utils';

type DateParams = {
    category: string,
    date: string,
};

type DateProps = {
    category: string,
    date: string,
    videos: VideoProps[]
};

type VideoProps = {
    videoId: string,
    title: string
}

export const getStaticPaths: GetStaticPaths<DateParams> = async () => {
    const categories: string[] = await getAllCategories();

    const categoriesWithDates: Array<{ category: string, date: Date }> = [];

    for (const category of categories) {
        const dates: Date[] = await getDatesForCategory(category);

        categoriesWithDates.push(...dates.map(date => ({
            category,
            date
        })));
    }

    return {
        paths: categoriesWithDates.map(
            entry => ({
                params: {
                    category: entry.category,
                    date: formatDateForPath(entry.date)
                }
            })),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<DateProps, DateParams> = async (context) => {
    const date = parseDateFromPath(context.params.date);
    const videos: VideoData[] = await getAllVideosForPublishDate(context.params.category, date);

    return {
        props: {
            category: context.params.category,
            date: formatISO(date),
            videos: videos.map(video => ({
                videoId: video.metadata.video_id,
                title: video.metadata.title
            }))
        }
    };
};

const Index: NextPage<DateProps> = (props: DateProps): ReactNode => {
    const { category, videos } = props;
    const date = parseISO(props.date);

    const videoLinks: ReactNode[] = videos.map(
        video => (
            <li key={video.videoId} className="mx-3 list-disc">
                <Link href={getVideoPath(category, video.videoId)}>
                    {video.title}
                </Link>
            </li>
    ));

    return (
        <main className="mx-5 my-5">
          <h2 className="my-4 text-lg">
            Meetings that we have transcripts for.
            Transcripts for { props.category } on { intlFormat(date) }
          </h2>
            <ul className="flex flex-col flex-wrap h-screen">
                { videoLinks }
            </ul>
        </main>
    );
}

export default Index;
