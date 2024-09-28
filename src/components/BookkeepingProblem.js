import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./BookkeepingProblem.css"; // スタイルシートをインポート

const ItemType = {
  CATEGORY: "category",
  AMOUNT: "amount",
};

const DraggableItem = ({ name, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.CATEGORY,
    item: { name, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`item ${isDragging ? "dragging" : ""}`}>
      {name}
    </div>
  );
};

const DraggableAmount = ({ amount }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.AMOUNT,
    item: { amount },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className={`item ${isDragging ? "dragging" : ""}`}>
      {`${amount}円`}
    </div>
  );
};

const Entry = ({ entry, onDelete }) => {
  return (
    <div className="entry">
      <div className="entry-category">{entry.category}</div>
      <div className="entry-amount">
        {entry.amount ? `${entry.amount}円` : ""}
      </div>
      <button className="delete-entry" onClick={onDelete}>
        ×
      </button>
    </div>
  );
};

const DropZone = ({ onDrop, entries, type }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: [ItemType.CATEGORY, ItemType.AMOUNT],
    drop: (item, monitor) => onDrop(item, type),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`dropzone ${isOver ? "over" : ""}`}>
      {entries.map((entry, index) => (
        <Entry
          key={index}
          entry={entry}
          onDelete={() => onDrop(entry, type, true)}
        />
      ))}
    </div>
  );
};

const BookkeepingProblem = () => {
  const [problem, setProblem] = useState({
    text: "現金1000円を売上として記録せよ。",
    debitEntries: [],
    creditEntries: [],
  });

  const [categories] = useState([
    { name: "現金", type: "debit" },
    { name: "売上", type: "credit" },
    // ... その他の種別 ...
  ]);

  const [amounts] = useState([
    { amount: 1000 },
    { amount: 1100 },
    // ... その他の金額 ...
  ]);

  const handleDrop = (item, type, remove = false) => {
    setProblem((prev) => {
      let newEntries = [...prev[type + "Entries"]];
      if (remove) {
        newEntries = newEntries.filter((entry) => entry !== item);
      } else {
        if (item.type) {
          // 種別がドロップされた場合、新しいエントリを追加
          newEntries.push({ category: item.name, amount: null });
        } else {
          // 金額がドロップされた場合、最後のエントリの金額を更新
          const lastEntry = newEntries[newEntries.length - 1];
          if (lastEntry && lastEntry.amount === null) {
            lastEntry.amount = item.amount;
          } else {
            // 金額のみがドロップされた場合、新しいエントリを追加
            newEntries.push({ category: "", amount: item.amount });
          }
        }
      }
      return {
        ...prev,
        [type + "Entries"]: newEntries,
      };
    });
  };

  return (
    <div className="bookkeeping-problem">
      <h1>仕訳問題</h1>
      <div className="problem-text">{problem.text}</div>
      <div className="categories">
        {categories.map((category, index) => (
          <DraggableItem key={index} {...category} />
        ))}
      </div>
      <div className="amounts">
        {amounts.map((amount, index) => (
          <DraggableAmount key={index} {...amount} />
        ))}
      </div>
      <div className="entries">
        <div>
          <h2>借方</h2>
          <DropZone
            onDrop={handleDrop}
            entries={problem.debitEntries}
            type="debit"
          />
        </div>
        <div>
          <h2>貸方</h2>
          <DropZone
            onDrop={handleDrop}
            entries={problem.creditEntries}
            type="credit"
          />
        </div>
      </div>
    </div>
  );
};

export default BookkeepingProblem;
