import json

f = open("wordlist.txt", "r", encoding="utf-8")
rawWords = f.readlines()
f.close()
words = []

for rawWord in rawWords:
    word = rawWord.strip()
    # Filter out proper nouns, nouns with possesive commas, and 1 letter "words"
    if not word[0].isupper() and "'" not in word and len(word) > 1:
        words.append(word)

print(words)

dump = {}
for word in words:
    dump[word] = True

dump = json.dumps(dump, sort_keys=True, indent=4)

o = open("words.json", "w", encoding="utf-8")
o.write(dump)
o.close()