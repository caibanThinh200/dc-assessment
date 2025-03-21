## Introduce 

For this assessment, i will be using *NextJS* and *TypeScript* to build the Search Box 

Also i will be using some other libraries for styling, UI component and animations: *TailwindCSS*, *Shadcn UI* and *Framer motion*

## What i have archieved for the test
Build a perfect-pixel UI
Added keyboard controls (Tab key)
Page transition overlay with framer motion
Search function with debounce input and errors handling

## Installation 

Open project folder via the ZIP or Github repo and install project package with this command

```bash
npm install
```
Note: Make sure your machine is including these Node Versions *^18.18.0 || ^19.8.0 || >= 20.0.0*

## Project structure

### Components

Search Box is place on the main page, you can find it on `src/app/page.tsx`

```javascript 
import SearchBox from "@/components/blocks/SearchBox";

export default function Home() {
  return (
    <main className="bg-transparent p-10 lg:p-0 w-full mt-20">
      {/* This is the search box container  */}
      <SearchBox />
    </main>
  );
}

```

I split components into 3 parts: Layout, Blocks and UI

**Layout**: This folder will including components that will appear on all pages of the project (ex: Header, Footer)
**Blocks**: This folder will including components represent for each sections in the page (ex: Hero Banner, Card Grid, Testimonial, ...)
**UI**: This folder will including resuable components that will appear on different blocks (ex: Button, Input, Card, ...)

The searchbox is a **Block** and it contains reuse components **UI** like *Search Input* *Tag* *Result Card* *Loading spin* *Empty Placeholder*

### Connect API
I'm using axios to setup instance for API connection, you can find it on `src/lib/api.ts`

```javascript
import axios from "axios";

export const api = axios.create({
    baseURL:
        // Use default value incase the env variable is not set
        process.env.NEXT_PUBLIC_API_URL || "https://frontend-test-api.digitalcreative.cn/",
});

api.interceptors.request.use(async (config) => {
    try {
        return config;
    } catch (error) {
        return Promise.reject(error);
    }
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
```

Then use this instance to fetch Techonologies data.
`src/lib/api.ts`
```javascript
import { api } from "@/lib/api";
import { Technology, TechnologyFilters } from "@/types/technologies";

export const getTechnologies = async (filter: TechnologyFilters) => {
    const result = await api.get<Technology[]>("/", { params: filter, timeout: 5000 })
    return result?.data;
}
```

After this step, i call API handling on the component useEffect inside SearchBox.
`src/components/blocks/SearchBox.tsx`
```javascript
"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { SearchIcon } from "../ui/icons";
import Tag from "../ui/tag";
import ResultCard from "../ui/result";
import { getTechnologies } from "@/api/technologies"
import LoadingSpinner from "../ui/loading";
import Empty from "../ui/empty";
import { debounce } from "@/lib/utils";
import { Technology } from "@/types/technologies";
import { motion } from "motion/react"
import { AxiosError } from "axios";

const TAG_DATA = ["Languages", "Build", "Design", "Cloud"];

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
  const [selectTag, setSelectedTag] = useState("");

  const [data, setData] = useState<Technology[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    getTechnologies({ search: query || undefined, "no-throttling": false })
      .then(res => {
        setData(res)
        setError("")
      })
      .catch((err: AxiosError) => {
        if (err?.status === 500) {
          setError("Something wrong happen but this is not your fault :)")
        }
        if (err?.status === 408) {
          setError("The request timed out")
        }
      })
      .finally(() => setIsLoading(false));
  }, [query])

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm);
  };
  console.log(error)
  const debouncedSearch = debounce(handleSearch, 500);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInput(value);
    debouncedSearch(value);
  };

  const handleSelectTag = useCallback(
    (tag: string) => {
      let updatedTag = "";
      if (tag === selectTag) {
        updatedTag = "";
      } else {
        updatedTag = tag;
      }
      setInput(updatedTag)
      setQuery(updatedTag);
      setSelectedTag(updatedTag);
    },
    [selectTag, query]
  );

  return (
    <div className="bg-white rounded-20 drop-shadow-2xl md:w-2/3 lg:max-w-[600px] mx-auto w-full">
      <div className="p-6 pb-0 flex flex-col gap-6 items-center max-h-[600px]">
        <div className="w-full">
          <Input
            value={input}
            onChange={handleInputChange}
            icon={<SearchIcon />}
            error={!!error}
            placeholder="Search technologies we use at DC"
          />
        </div>
        <div className="flex gap-5 w-full max-xs:overflow-auto shrink">
          {TAG_DATA.map((tag, idx) => (
            <Tag
              onClick={() => handleSelectTag(tag)}
              isActive={selectTag === tag}
              title={tag}
              key={idx}
            />
          ))}
        </div>
        <LoadingSpinner loading={isLoading}>
          {!!error ? <Empty type={"error"} /> : (data || [])?.length > 0 ? (
            <motion.div
              initial={{ maxHeight: 300 }}
              animate={{ maxHeight: 300 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              exit={{ maxHeight: 0 }}
              key={"container"}
              className="flex flex-col gap-5 w-full overflow-auto h-fit"
            >
              {(data || []).map((data) => (
                <ResultCard key={data?.title} technology={data} />
              ))}
            </motion.div>
          ) : <Empty type={"empty"} />}
        </LoadingSpinner>
      </div>
      <div className="border-t border-input p-6 py-3">
        {error ? <p className="text-error">{error}</p> : <p className="text-grey font-medium mb-0">{isLoading ? "Searching..." : data?.length === 0 ? "No result" : `${data?.length} results`}</p>}
      </div>
    </div>
  );
};

export default SearchBox;
```


