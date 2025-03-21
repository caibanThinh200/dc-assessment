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
