import { usePubSub } from "create-pubsub/react";
import {
  promptPubSub,
  responsePubSub,
  searchResultsPubSub,
  urlsDescriptionsPubSub,
} from "../modules/pubSub";
import { SearchForm } from "./SearchForm";
import { Toaster } from "react-hot-toast";
import { SettingsButton } from "./SettingsButton";
import Markdown from "markdown-to-jsx";
import { getDisableAiResponseSetting } from "../modules/pubSub";
import { SearchResultsList } from "./SearchResultsList";

export function App() {
  const [query, updateQuery] = usePubSub(promptPubSub);
  const [response] = usePubSub(responsePubSub);
  const [searchResults] = usePubSub(searchResultsPubSub);
  const [urlsDescriptions] = usePubSub(urlsDescriptionsPubSub);

  return (
    <>
      <SearchForm query={query} updateQuery={updateQuery} />
      {!getDisableAiResponseSetting() && response.length > 0 && (
        <div
          style={{
            backgroundColor: "var(--background)",
            borderRadius: "6px",
            padding: "10px 25px",
          }}
        >
          <Markdown>{response}</Markdown>
        </div>
      )}
      {searchResults.length > 0 && (
        <div>
          <SearchResultsList
            searchResults={searchResults}
            urlsDescriptions={urlsDescriptions}
          />
        </div>
      )}
      <div
        style={
          searchResults.length === 0
            ? {
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
              }
            : {
                display: "flex",
                justifyContent: "center",
              }
        }
      >
        <SettingsButton />
      </div>
      <Toaster />
    </>
  );
}