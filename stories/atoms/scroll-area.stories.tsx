import { ComponentStory } from "@storybook/react";
import { ScrollArea, ScrollViewport } from "components/atoms/ScrollArea/scroll-area";

const storyConfig = {
  title: "Design System/Atoms/ScrollArea",
  component: "ScrollArea"
};

const content = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi similique ut eos perspiciatis illo dolorum ullam excepturi cumque aut incidunt quo, recusandae repudiandae debitis architecto distinctio tenetur facilis exercitationem praesentium!";
const paragraphs = Array.from({ length: 50 }).map(
  (_, i, a) => `${i}. ${content}`
);

export default storyConfig;

const ScrollAreaTemplate: ComponentStory<typeof ScrollArea> = (args) => (
  <ScrollArea {...args}>
    <ScrollViewport className="max-h-[300px]">
      <div>
        {paragraphs.map((p, i) => (
          <>
            <div className="p-2" key={i}>
              { p }
            </div>
            <hr/>
          </>
        ))}
      </div>
    </ScrollViewport>
  </ScrollArea>
);

export const Default = ScrollAreaTemplate.bind({});

Default.args = {
  type: "auto",
  style: { maxHeight: "200px" }
};