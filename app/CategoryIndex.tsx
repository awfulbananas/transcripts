import Link from 'next/link';
import { getCategoryPath } from '../utilities/path-utils';

type Props = {
    categories: string[]
};

export default function CategoryIndex(props: Props) {
    const { categories } = props;

    const categoryLinks = categories.map(
        category => (
            <li key={category} className="mx-3 list-disc text-lg">
                <Link href={ getCategoryPath(category) }>
                    {category}
                </Link>
            </li>
        )
    );

    return (
        <main className="mx-5 my-5">
            <h2 className="my-4 text-lg">
                Meetings that we have transcripts for.
            </h2>
            <ul className="flex flex-col flex-wrap h-screen">
                {categoryLinks}
            </ul>
        </main>
    );
}

