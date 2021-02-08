1) select id from Document 
   where Document.id not in 
        (select document_id from Page
         where Page.document_id = Document.id)


2) select title, page_cnt
    from report
        inner join (select report_id, sum(d_page_cnt) as page_cnt 
                    from Document
                    inner join (select document_id, count(id) as d_page_cnt 
                            from Page 
                            group by document_id) as B
                    on B.document_id= Document.id
        group by report.id) as A
        on A.report_id= Report.id

3) 
-- I would add the comments as a new field in each table, with it's type being text; Report, Document, Page. 
-- This makes the most sense as every page can have it's own comment, every document can have it's own comment, and the report overall can have it's own set of comments

-- A sample query to get the comment from Page table would look like
-- we are using value(Page.comment, '') since all nonprimary columns default to null, if the value is null then it will return '' else it will return comment
select Report.id, Report.title, Document.id, Page.id, value(Page.comment, '')
    from Report, Document, Page
    where Document.report_id = Report.id AND Page.document_id = Document.id And value(Page.comment, '') > '')
