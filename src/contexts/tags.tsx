import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import * as Models from 'models';
import * as Apis from "apis";

interface TagsContextData {
  tags: Models.Tag[];
  addTag: (input: Omit<Models.Tag, 'id'>) => Promise<Models.Tag>;
  updateTag: (input: Models.Tag) => Promise<Models.Tag>;
  deleteTag: (id: string) => Promise<void>;
}

const TagsContext = createContext<TagsContextData>({} as TagsContextData);

export const TagsProvider = ({ children }: { children: ReactNode }) => {

  const [allTags, setAllTags] = useState<Models.Tag[]>([]);

  useEffect(() => {
    Apis.tag.getMyTags().then(tags => {
      setAllTags(() => tags);
    })
  }, []);

  const updateTag = (input: Models.Tag) => {
    return new Promise<Models.Tag>(async (resolve, reject) => {
      Apis.tag.updateTag(input).then((updatedTag) => {
        const updatedTags = [...allTags];
        const tagIndex = updatedTags.findIndex(
          tagItem => tagItem.id === updatedTag.id,
        );
        updatedTags[tagIndex] = updatedTag;
        setAllTags(updatedTags);
        resolve(updatedTag);
      }).catch(() => {
        reject();
      });
    });
  };

  const addTag = (input: Omit<Models.Tag, 'id'>) => {
    return new Promise<Models.Tag>(async (resolve, reject) => {
      Apis.tag.createTag(input).then((newTag) => {
        setAllTags(state => [...state, newTag]);
        resolve(newTag);
      }).catch(() => {
        reject();
      });
    });
  };


  const deleteTag = (id: string) => {
    return new Promise<void>((resolve, reject) => {
      Apis.tag.deleteTag({ id }).then(() => {
        setAllTags(state => state.filter(tag => tag.id !== id));
        resolve();
      }).catch(() => {
        reject();
      })
    });
  };


  return (
    <TagsContext.Provider
      value={{
        tags: allTags,
        addTag,
        updateTag,
        deleteTag,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
};

export const useTags = (): TagsContextData => {
  const context = useContext(TagsContext);

  if (!context) {
    throw new Error('useTags must be used within a TagsProvider');
  }

  return context;
}