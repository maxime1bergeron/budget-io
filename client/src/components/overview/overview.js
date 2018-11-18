import React from 'react';
import './overview.css';

class Overview extends React.Component {

	getOverviewData (data, key) {
		const amount = (data[key])? data[key] : 0;
		return amount.toFixed(2) + "$";
	}


	render () {

		const data = this.props.data;
		const year = this.props.year;	
		
		const months = this.props.months;
		const categories = this.props.categories;
		const columns = this.props.columns;

		return (
			<section className="overview">
				<div className="overview-scroller">
					<table className="overview-table" cellSpacing="0" cellPadding="0">
						<thead>
							<tr className="overview-title-row">
								<th className="overview-hidden	">&nbsp;</th>
								{categories.map((category, i) => (
									<th 
										key={year+"-"+category.tag} 
										colSpan={category.items} 
										className={"overview-"+category.tag}
									>
										{category.name}
									</th>
								))}
							</tr>
							<tr className="overview-subtitle-row">
								<td className="overview-year">{year}</td>
								{columns.map((column, i) => (
									<th 
										key={year+"-"+column.category+"-"+column.tag} 
										className={"overview-"+column.category}
									>
										{column.name}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{months.map((month, i) => (
								<tr key={year+""+((i<9)?"0"+(i+1):(i+1))} className="overview-data-row">
									<td className="overview-month">{month}</td>
									{columns.map((column, j) => {
										const key = year+""+((i<9)?"0"+(i+1):(i+1))+"."+column.category+"-"+column.tag;
										return (											
											<td key={key} className={"overview-"+column.category} onClick={() => this.props.onClick(key)} >
												{this.getOverviewData(data, key)}
											</td>
										)
									})}
								</tr>
							))}
						</tbody>
						<tfoot>
							<tr className="overview-subtotals-row">
								<td className="overview-subtotals">Sous-Total</td>
								{columns.map((column, i) => {
									const key = year+"."+column.category+"-"+column.tag;
									return (
										<td key={key} className={"overview-"+column.category}>
											{this.getOverviewData(data, key)}
										</td>
									)
								})}
							</tr>
							<tr className="overview-totals-row">
								<td className="overview-hidden	">&nbsp;</td>
								{categories.map((category, i) => {
									const key = year+"."+category.tag
									return ([
										<td key={key+"-tag"} colSpan={category.items-1} className={"overview-"+category.tag+" overview-totals-tag"}>
											Sous-Total
										</td>,
										<td key={key} className={"overview-"+category.tag+" overview-totals-total"}>
											{this.getOverviewData(data, key)}
										</td>
									])
								})}
							</tr>
						</tfoot>
					</table>
				</div>
			</section>
		);
	}
}

export default Overview;