import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts"
import { retriever } from './retriever';
import { combineDocuments } from './combineDocuments';

const openAIApiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openAIUrl = import.meta.env.VITE_OPENAI_BASE_URL;

const llm = new ChatOpenAI({
  apiKey: openAIApiKey,
  configuration: {
    baseURL: openAIUrl,
  }
});

const standaloneQuestionTemplate = `Given some conversation history (if any) and a question,
convert the question to a standalone question.
conversation history: {conv_history}
question: {question}
standalone question:`;
const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate);

const answerTemplate = `You are a helpful and enthusiastic support bot who can answer a given question based on
the context provided and the conversation history. Try to find the answer in the context. If the answer is not given
in the context, find the answer in the conversation history if possible. If you really don't know the answer,
say "I'm sorry, I don't know the answer to that." And direct the questioner to email help@example.com.
Don't try to make up an answer. Always speak as if you were chatting to a friend.
context: {context}
conversation history: {conv_history}
question: {question}
answer: `;
const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

const standaloneQuestionChain = standaloneQuestionPrompt
  .pipe(llm)
  .pipe(new StringOutputParser());

const retrieverChain = RunnableSequence.from([
  prevResult => prevResult.standalone_question,
  retriever,
  combineDocuments,
]);

const answerChain = answerPrompt
  .pipe(llm)
  .pipe(new StringOutputParser());

const logConvHistory = async (input) => {
  console.log('Conversation History:', input.conv_history);
  return input;
}

const chain = RunnableSequence.from([
  {
    standalone_question: standaloneQuestionChain,
    original_input: new RunnablePassthrough(),
  },
  {
    context: retrieverChain,
    question: ({ original_input }) => original_input.question,
    conv_history: ({ original_input }) => original_input.conv_history,
  },
  logConvHistory,
  answerChain,
]);

export { chain };
